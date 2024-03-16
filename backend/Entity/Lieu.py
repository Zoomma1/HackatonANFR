class Lieu:

    def addGroupsToLieu(self, groups: list):
        self.groups.append(groups)

    def removeGroupsToLieu(self, group):
        self.groups.remove(group)

    def setGroupsToLieu(self, groups: list):
        self.groups = groups

    def __init__(self, localisation: str):
        self.localisation = localisation
