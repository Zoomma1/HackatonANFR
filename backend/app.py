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
def getThemAll():
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
    return JSONResponse(step1)



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
    for lieu in lieux:
        listGroup: list = []
        for line in libre:
            if line[0] == lieu:
                salle = Service(line[0], line[1], line[2], line[3])
                if len(listGroup) == 0:
                    listGroup.append(Group(salle.frequence))
                else:
                    for reservedLine in reservation:
                        if reservedLine[5] == lieu:
                                for group in listGroup:
                                    if group.checkEmptyPlace(Service(reservedLine)):
                                        group.AddToListGroup(Service(reservedLine[0], reservedLine[1], reservedLine[2], reservedLine[3]))

        return listGroup



