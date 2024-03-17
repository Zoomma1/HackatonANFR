from typing import Union

from fastapi import FastAPI
from starlette.responses import JSONResponse
import Reader
from starlette.middleware.cors import CORSMiddleware
from Entity.Service import Service
from Entity.Lieu import Lieu
from Entity.Group import Group

app: FastAPI = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows CORS from this origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader: Reader


@app.get("/getAll")
def getThemAll(number: Union[int, None] = None):
    response: JSONResponse
    responseArray = {}
    InitList: list = Reader.Reader("tableauInit.csv").csvToList()
    step1: dict = {}
    ## create localisation
    for line in InitList:
        step2: dict = {}
        step2['Service'] = line[1]
        step2['Frequence'] = {
            'Fr_min': line[2],
            'Fr_max': line[3],
            'Preset': line[4],
        }
        if line[0] in step1:
            step1[line[0]].append(step2)
        else:
            step1[line[0]] = [step2]
    if number is not None:
        sliced_dict = dict(list(step1.items())[:number])
        return JSONResponse(sliced_dict, status_code=418)
    else:
        return JSONResponse(step1, status_code=418)



@app.get("/getFree")
def free():
    ## correspond au group
    libre: list = (Reader.Reader('tableauInit.csv')).csvToList()
    ## correspond au services
    reservation: list = (Reader.Reader('tableauReservee.csv')).csvToList()
    ## correspond au lieu
    lieuList: list = Reader.Reader('tableauInit.csv').csvToList()
    lieux: dict = {}

    # ajouter les lieux
    for line in lieuList:
        if line[0] not in lieux:
            lieux[line[0]] = Lieu(line[0])

    # génère des groups vide avec un lieu et une plage de fréquence
    result = {}
    for lieu in lieux:
        sorted_data = sorted(libre, key=lambda x: (float(x[2]) + float(x[3])) / 2)
    for data in sorted_data:
        if data[0] in result:
            if data[1] in result[data[0]]:
                result[data[0]][data[1]].append(data[2:])
            else:
                result[data[0]][data[1]] = [data[2:]]
        else:
            result[data[0]] = {data[1]: [data[2:]]}

    # Initialize an empty dictionary to hold the groups
    groups = {}

    # Function to check if two frequency ranges overlap
    def overlap(freq1, freq2):
        return not (float(freq1[1]) < float(freq2[0]) or float(freq2[1]) < float(freq1[0]))

    for lieu, services in result.items():
        groups[lieu] = []
        current_freqs = {}

        for service, freqs in services.items():
            freqs.sort(key=lambda x: (float(x[2]) if len(x) > 2 and x[2].replace('.', '', 1).isdigit() else 0.0 + float(
                x[3]) if len(x) > 3 and x[3].replace('.', '', 1).isdigit() else 0.0) / 2)

        while any(services.values()):
            group = {}

            for service, freqs in list(services.items()):
                if not freqs:
                    del services[service]
                    continue

                # If the next frequency overlaps with the current one, create a new group
                if service in current_freqs and overlap(current_freqs[service], freqs[0]):
                    groups[lieu].append(group)
                    group = {}

                group[service] = freqs.pop(0)
                current_freqs[service] = group[service]

            for existing_group in groups[lieu]:
                for service, freq in group.items():
                    for existing_service, existing_freq in existing_group.items():
                        if overlap(freq, existing_freq):
                            break
                    else:
                        continue
                    break
            else:
                groups[lieu].append(group)

    return groups

