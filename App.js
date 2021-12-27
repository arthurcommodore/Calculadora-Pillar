PiDefine('App', class extends PiApp {
    routes = {
        'default'() {
            app.loadHomePage()
        }
    }


    loadHomePage() {
        yum.download([PiUrl.create('components/Calculator.js')], () => {
            this.setPage(new Calculator());
        });
    }
});