const timeout = 15000;

describe("About tests", () => {
    let page;

    // parcours client avec about

    test('display about', async () => {
        await page.waitForSelector('#navbar li a');
        // click sur le lien "About" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'About' )[0].click();
        });
        // on attent que l'élément ".about-contents" soit chargé
        await page.waitForSelector('.about-contents');
        // on récupère le code HTML
        const html = await page.$eval('.about-contents', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("powered by Polr 2");
        // screenshot for result
        await page.screenshot({path: './tests/img/about-display_about.png'});
    }, timeout);

    test('display more information', async () => {
        // click on MORE INFORMATION
        await page.click('.btn-success');
        
        // on récupère les more informations
        const more_informations = await page.$eval('#gpl-license', e => e.innerHTML);
        // on vérifie qu'il contient une chaîne de caractères présente dans le more informations
        expect(more_informations).toContain("Copyright (C) 2013-2017 Chaoyi Zha");

        // screenshot for result
        await page.screenshot({path: './tests/img/about-display_more_information.png'});
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()

      //start initial condition
        // va à l'adresse suivante
        await page.goto('http://polr.alwaysdata.net');
        // attend que l'element apparaise dans la page
        await page.waitForSelector('#navbar li a');
        // click sur le bouton "Sign In " de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'Sign In ' )[0].click();
        });
        // logged in as admin
        await page.waitForSelector('[name=username]');
        await page.type('[name=username]', 'admin');
        await page.waitForSelector('[name=password]');
        await page.type('[name=password]', 'campus');
        await page.waitForSelector('[name=login]');
        await page.click('[name=login]');
      //end initial condition
    }, timeout)

});


// si besoin de vérifier je peux prendre un screen avec 
// await page.screenshot({path: './tests/img/about-test.png'});
// être plus précis entre le cahier des tests et les tests en eux mêmes
// exemple pour le test display_about on fait expect(html).toContain("powered by Polr 2");
// alors que dans le cahier des charges on demande si on affiche bien l'about du site.