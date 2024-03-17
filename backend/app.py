from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
from starlette.responses import JSONResponse
import Reader
from starlette.middleware.cors import CORSMiddleware
from ScriptDispo.main import check_frequency_availability as check_availability
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

class Item(BaseModel):
    start_date:str
    end_date:str
    service:str
    usage_type:str
    venue:str
    rx_freq_min:str
    rx_freq_max:str
    tx_freq_min: Optional[str] = None
    tx_freq_max: Optional[str] = None
    duplex: Optional[str] = None


@app.get("/checkValidate")
async def free(item: Item):
    result = check_availability(item.start_date, item.end_date, item.service, item.usage_type, item.venue, (float(item.rx_freq_min)+float(item.rx_freq_max))/2, (float(item.tx_freq_min)+float(item.tx_freq_max))/2, item.duplex)
    return JSONResponse(result,status_code=200)
