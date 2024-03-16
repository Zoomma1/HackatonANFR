from .Service import Service


class Group:

    def __init__(self, frequence: dict):
        self.frequence = frequence

    def setListGroups(self, services: list):
        self.services = services

    def AddToListGroup(self, service):
        self.services.append(service)

    def removeToGroup(self, service):
        self.services.remove(service)

    def removeAll(self):
        self.services = []

    def checkEmptyPlace(self, foreignService: Service):
        for service in self.services:
            if service.service == foreignService.service:
                return False
        if self.frequence['Fr_min'] <= foreignService.frequence['Fr_min'] and self.frequence['Fr_max'] >= foreignService.frequence['Fr_max']:
            for service in self.services:
                if ((foreignService.frequence['Fr_min'] < service.frequence['Fr_min'] and foreignService.frequence['Fr_max'] < service.frequence['Fr_min']) or (foreignService.frequence['Fr_min'] > service.frequence['Fr_max'] and foreignService.frequence['Fr_max'] > service.frequence['Fr_max'])):
                    return True
        return False
