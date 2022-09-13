const puppeteer = require('puppeteer');
const path = require('path');
const browserOptions = {
    headless: true,
    defaultViewport: null,
    devtools: true,
};
let browser;
let page;
beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    
    page = await browser.newPage();
    await page.goto(`file://${path.resolve(__dirname, '../index.html')}`);
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    
}, 30000);
afterAll(async () => {
    await browser.close();
});

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
describe('Navigation bar', () => {
    test('`nav` element exists and has at least three items', async () => {
        const nav = await page.$eval('nav', el => el.innerHTML);
        // get a elements inside nav
        const navItems = await page.$$('nav li');
        // get the number of elements
        const navItemsLength = await navItems.length;
        expect (navItemsLength).toBeGreaterThan(2);
        //expect(nav).toContain('News');
    });
    test('the navigation bar has a logo image', async () => {
        const logo = await page.$eval('nav img', el => el.src);
        expect(logo).toBeDefined();
    });
    test('Navbar is always at the top of the page when scrolling down', async () => {
        // scroll to bottom
        await autoScroll(page);
        await page.evaluate( () => {
            window.scrollBy(0, window.innerHeight);
        });
       
       
        //const navStyle = await page.evaluate(el => el.getBoundingClientRect(), nav);
        const elementPositions = await page.$eval('nav', el => {
            let a = el
            const positions = [];
            while (a) {
                const pos = a.nodeType === 1 ? getComputedStyle(a).position : null
                positions.unshift(pos);
                a = a.parentNode;
            }
            return positions
        });
        expect(elementPositions).toContain('sticky')
});
});
describe('Banner', () => {
    test('section has image background', async () => {
        // get a element computed style
        const elementStyle = await page.$eval('#banner', element => {
            return getComputedStyle(element).backgroundImage;
        }
        );
        expect(elementStyle).toBeTruthy();
    });
    test('section has a title `h1` with font family `Love Ya Like A Sister`', async () => {
        // get a element computed style
        const elementStyle = await page.evaluate(() => {
            const element = document.querySelector('#banner h1');
            return getComputedStyle(element).fontFamily;
        }
        );
        expect(elementStyle).toContain('Love Ya Like A Sister');
    } );

});
describe('The idea section', () => {
    test('the section has a title `h2` with font family `Love Ya Like A Sister`', async () => {
        // get a element computed style
        const elementStyle = await page.evaluate(() => {
            const element = document.querySelector('#about-us h2');
            return getComputedStyle(element).fontFamily;
        });
        expect(elementStyle).toContain('Love Ya Like A Sister');
    });
    test('the section has three columns', async () => {
        const cards = await page.$$('#about-us .col-lg-4');
        // get a elements inside nav
        const cardsLength = await cards.length;
        // get first element offset top
        const firstCardOffsetTop = await page.$eval('#about-us .col-lg-4:nth-child(1)', el => el.offsetTop);
        const secondCardOffsetTop = await page.$eval('#about-us .col-lg-4:nth-child(2)', el => el.offsetTop);
        const thirdCardOffsetTop = await page.$eval('#about-us .col-lg-4:nth-child(3)', el => el.offsetTop);
        expect(firstCardOffsetTop).toBe(secondCardOffsetTop)
        expect(firstCardOffsetTop).toBe(thirdCardOffsetTop)
        expect (cardsLength).toBe(3);
    } );
});
describe('What\'s new section', () => {
    test('the section has a title `h2` with font family `Love Ya Like A Sister`', async () => {
        // get a element computed style
        const elementStyle = await page.evaluate(() => {
            const element = document.querySelector('#about-us h2');
            return getComputedStyle(element).fontFamily;
        });
        expect(elementStyle).toContain('Love Ya Like A Sister');
    });
   
    test('the section has six columns that are centered', async () => {
        const centerElement = await page.$('#team .align-items-center, #team .justify-content-center, #team.align-items-center, #team.justify-content-center')
        const cards = await page.$$('#team .card');
        // get a elements inside nav
        const cardsLength = await cards.length;
        // get computed style align-items
        expect(centerElement).toBeTruthy()
        // get first element offset top
        expect (cardsLength).toBe(6);
    } );
});
describe('Book a table section', () => {
    test('the section has a title `h2` with font family `Love Ya Like A Sister`', async () => {
        const element = await page.$eval('#contact h2', el => el.innerHTML);
        // get a element computed style
        const elementStyle = await page.evaluate(() => {
            const element = document.querySelector('#contact h2');
            return getComputedStyle(element).fontFamily;
        });
        expect(elementStyle).toContain('Love Ya Like A Sister');
    });
    test('the section has a form with two input fields', async () => {
        // get a elements inside nav
        const formLength = await page.$$('#contact form input');
        // get the number of elements
        const formLengthLength = await formLength.length;
        expect (formLengthLength).toBe(2);
    } );
});


describe('Navigation interaction', () => {
    test('the page scrolls to the appropriate section when nav item is clicked', async () => {
        // get current scroll position
        const scrollPosition = await page.evaluate(() => {
            return window.scrollY;
        }
        );
        
        const navItems = await page.$$('nav li');
        const navItemsLength = await navItems.length;
        // get the first element
        const firstNavItem = await navItems[0].$('a');
        // click on the first element
        await firstNavItem.click();
        // wait for one second
        await page.waitForTimeout(1000);
        // get current scroll position
        const newScrollPosition = await page.evaluate(() => {
            return window.scrollY;
        });
        expect(newScrollPosition).not.toBe(scrollPosition);
    });
});


describe('Responsivity', () => {
    test('the page is responsive on tablet', async () => {
        await page.setViewport({
            width: 800,
            height: 980
        });
        async function autoScroll(page){
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 100;
                    var timer = setInterval(() => {
                        var scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
        
                        if(totalHeight >= scrollHeight){
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        }
       
        // get scroll Horizontal
        await autoScroll(page);
        // check if page scrollable Horizontal
        const scrollHorizontal = await page.evaluate(() => {
            return document.body.scrollWidth > document.body.clientWidth;
        });
        expect(scrollHorizontal).toBe(false);

    });
});
