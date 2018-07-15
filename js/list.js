(function() {
    app.controller('ModuleA', heroPanelController);

    heroPanelController.$inject = ["stateService", "heroService"];

    function heroPanelController(stateService, heroService) {
        var self = this;
        self.stateString = stateService.getState();
        self.heroList = heroService.getHeroList();
    }
})();