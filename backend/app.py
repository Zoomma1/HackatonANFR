from fastapi import FastAPI
from starlette.responses import JSONResponse
import Reader

app: FastAPI = FastAPI()
reader: Reader


@app.get("/getAll")
def getThemAll():
    response: JSONResponse
    responseArray = {}
    ClusterList: list = Reader.Reader("Cluster.csv").csvToList()
    FrequenceList: list = Reader.Reader("tableau.csv").csvToList()
    for line in ClusterList:
        # if the first element of the line is not in the responseArray
        if (line[0] not in responseArray):
            responseArray[line[0]] = []
    responseArray['NoCluster'] = []
    ## create localisation
    for line in FrequenceList:
        step2: dict = {}
        step2["Localisation"] = line[0]
        step2['Service'] = line[1]
        step2['Frequence'] = {
            'Fr_min': line[2],
            'Fr_max': line[3],
            'Preset': line[4],
        }
        found = False
        for line in ClusterList:
            if ((step2['Localisation'] == line[3]) and (step2['Service'] == line[1])):
                step2['Usage'] = line[2]
                step2['Cluster'] = line[0]
                found = True
            if not found:
                step2['Cluster'] = "NoCluster"
        if ('Usage' not in step2):
            step2['Usage'] = None
        responseArray[step2['Cluster']].append(step2)
    return responseArray

    # exemple of request with parameters
    # @app.get("/items/{item_id}")
    # def read_item(item_id: int, q: Union[str, None] = None):
    #     return {"item_id": item_id, "q": q}
