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

@app.get("/getReservation")
def reservation():
    reservation: list = (Reader.Reader('tableauReservee.csv')).csvToList()
    result = {}
    for line in reservation:
        step2: dict = {}
        if line[12] == '':
            Fr_Rx_min = None
            Fr_Rx_max = None
        else:
            Fr_Rx_min = float(line[12]) - float(line[9])*10**(-3)
            Fr_Rx_max = float(line[12]) + float(line[9])*10**(-3)
        step2['Service'] = line[6]
        step2['Frequence'] = {
            'Envoyée': {
                'Fr_min': float(line[10]) - float(line[9])*10**(-3),
                'Fr_max': float(line[10]) + float(line[9])*10**(-3),
            },
            'Recu': {
                'Fr_min': Fr_Rx_min,
                'Fr_max': Fr_Rx_max,
            }
        }
        step2['DateDebut'] = line[3]
        step2['DateFin'] = line[4]

        if line[7] in result:
            result[line[7]].append(step2)
        else:
            result[line[7]] = [step2]
    return JSONResponse(result,status_code=418)

@app.get("/getAvalaible")
def available():
    reservation: list = (Reader.Reader('ScriptDispo/results.csv')).csvToList()
    result = {}
    for line in reservation:
        line = line[0].split(',')
        step2: dict = {}
        if line[12] == '':
            Fr_Rx_min = None
            Fr_Rx_max = None
        else:
            Fr_Rx_min = float(line[12]) - float(line[9])*10**(-3)
            Fr_Rx_max = float(line[12]) + float(line[9])*10**(-3)
        step2['Service'] = line[6]
        step2['Frequence'] = {
            'Envoyée': {
                'Fr_min': float(line[10]) - float(line[9])*10**(-3),
                'Fr_max': float(line[10]) + float(line[9])*10**(-3),
            },
            'Recu': {
                'Fr_min': Fr_Rx_min,
                'Fr_max': Fr_Rx_max,
            }
        }
        step2['DateDebut'] = line[3]
        step2['DateFin'] = line[4]
        step2['Disponibilité'] = line[16]

        if line[7] in result:
            result[line[7]].append(step2)
        else:
            result[line[7]] = [step2]
    return JSONResponse(result,status_code=418)

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



