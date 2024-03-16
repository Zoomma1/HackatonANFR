import csv


class Reader:

    path: str

    def  __init__(self, path: str):
        self.path = path

    def csvToList(self) -> list:
        # Liste pour stocker les lignes du fichier CSV
        lignes = []

        # remplacer le chemin par celui menant au fichier csv dans votre PC
        with open('tableau.csv', newline='') as f:
            reader = csv.reader(f, delimiter=';')
            next(reader)  # Ignorer la première ligne (en-têtes de colonnes)
            for ligne in reader:
                lignes.append(ligne)
            return lignes

    def __str__(self):
        lignes: list = self.csvToList()
        return str(lignes)