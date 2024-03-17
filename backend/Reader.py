import csv
import os


class Reader:

    path: str

    def  __init__(self, path: str):
        self.path = path

    def csvToList(self) -> list:
        # Liste pour stocker les lignes du fichier CSV
        lignes = []
        self.path = os.path.dirname(os.path.realpath(__file__)) + '/' + self.path

        print(self.path)
        # remplacer le chemin par celui menant au fichier csv dans votre PC
        with open(file=self.path, newline='') as f:
            reader = csv.reader(f, delimiter=';')
            next(reader)  # Ignorer la première ligne (en-têtes de colonnes)
            for ligne in reader:
                lignes.append(ligne)
            return lignes

    def __str__(self):
        lignes: list = self.csvToList()
        return str(lignes)
