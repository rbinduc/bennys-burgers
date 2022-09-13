# Benny's burger
Let's use Bootstrap to create a restaurant page!

Check out the layout images below.

## Requirements

### Styling and responsivity
-   Use sass to style the page. It is already added as a devDependency to the project. Work in the file `src/scss/main.scss`.
-   Work in the file `src/index.html`.
-   Add bootstrap to the project via `npm`.
-   Use bootstrab to make your page responsive.
### Navigation bar
-   The appropriate semantic HTML tag should be used to create the navigation bar.
-   The navigation bar should have a logo image and use list items as navigation items.
-   The navigation bar should stick in place at the top of the screen while scrolling.

### Banner
-   The banner section that contains the "Benny\'s burger" headline, should have ID `#banner`.
-   The banner element should have the background image provided in the `src/images` folder.
-   The banner should have a title `<h1>` with custom font "[`Love Ya Like A Sister`](https://fonts.google.com/specimen/Love+Ya+Like+A+Sister)".

### The idea section
-   The container of the 'The idea' section should have ID `#about-us`.
-   inside the container create a title `<h2>` with custom font "[`Love Ya Like A Sister`](https://fonts.google.com/specimen/Love+Ya+Like+A+Sister)".
-   Use bootstrap to arrange the content in the section into three columns on large screens(desktop)
### What's new section
-   The container of the section should have ID `#team`.
-   The section should contain a title `<h2>` with custom font "[`Love Ya Like A Sister`](https://fonts.google.com/specimen/Love+Ya+Like+A+Sister)".
-   Use bootstrap\'s Card component to create the content items with image and text
-   Use the appropriate bootstrap class to **center** the columns on the page

### Book a table
-   The container should have ID `#contact`. 
-   The container should contain a title `<h2>` with custom font "[`Love Ya Like A Sister`](https://fonts.google.com/specimen/Love+Ya+Like+A+Sister)".

### Navigation interaction
-   You have already created three navigation items inside the `nav` element. by clicking on one nav item, the page should scroll down to the respective section, __e.g. by clicking "Contact" in the navigation bar, the page should scroll down to the "Book a table" section__.


## Desktop:
![example-desktop](exercise/example-desktop.jpg)

## Tablet

![example-tablet](exercise/example-tablet.png)

## Mobile

![example-mobile](exercise/example-mobile.png)

Note: have a look into the `node_modules/scss/bootstrap/_variables.scss` file to see what variables you need to target to set your custom values.