from fastapi import FastAPI
from starlette.responses import JSONResponse
import Reader
from starlette.middleware.cors import CORSMiddleware
from Entity.Service import Service
from Entity.Lieu import Lieu

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
    ClusterList: list = Reader.Reader("Cluster.csv").csvToList()
    InitList: list = Reader.Reader("tableauInit.csv").csvToList()
    step1: list = {}
    ## create localisation
    for line in InitList:
        step2: dict = {}
        step2['Service'] = line[1]
        step2['Frequence'] = {
            'Fr_min': line[2],
            'Fr_max': line[3],
            'Preset': line[4],
        }
        step1[line[0]] = step2
    return step1



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
                for group in listGroup:
                    if group.checkEmptyPlace(Service(line[0], line[1], line[2], line[3])):
                        group.AddToListGroup(Service(line[0], line[1], line[2], line[3]))
                        break
        return listGroup



