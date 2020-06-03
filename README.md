Build: [![CircleCI](https://circleci.com/gh/mojaloop/finance-portal-ui/tree/master.svg?style=svg)](https://circleci.com/gh/mojaloop/finance-portal-ui/tree/master)

## Build
With the default version. Will be $COMMITHASH if there are no local changes, or $COMMITHASH-local
if there are.
```bash
make build
```
With a specific version:
```bash
make build VER=whatever-you-want
```

## Run
### Containerised
You'll need a running frontend-backend. See instructions for [finance-portal-backend-service](
https://github.com/mojaloop/finance-portal-backend-service#running-locally).

Default port (3000):
```bash
make run
```
On a different port:
```bash
make run LISTEN_PORT=3001
```

### Natively
You'll need a running frontend-backend. See instructions for [finance-portal-backend-service](
https://github.com/mojaloop/finance-portal-backend-service#running-locally).
```bash
npm install
npm start
```

### Local production build
Serving the artifacts as they will be delivered in the built artifact without doing so from docker
is possible as follows:

From the local repo root (so that the `./build` path is correct):
```
npm ci
npm run build
npx serve ./build
```

## Develop
### With Storybook
[Storybook](https://storybook.js.org) has been integrated with this project. Storybook renders a single component in a browser environment with mocked data to accelerate UI development. Get started with the command below:
```bash
npm run storybook
```

## Audit Issues
This repository uses [npm-audit-resolver](https://github.com/naugtur/npm-audit-resolver#readme) to check for security vulnerabilities. Basic troubleshooting of a failed security check is as follows:
1. Run `npm audit` to show the current issues.
2. Run `npm audit fix` to attempt to automatically fix the current issues.
3. If an issue must be ignored, and **it is absolutely safe to do so**, run `npm run audit:resolve` and select "remind me in 24h"

## TODO
* Read a little more nginx documentation, consider creating a proper nginx config, because
  * Support client-side routing using browser pushState API
  * Customise logging
  * Support compression of (especially) responses
* ~~Lint in circle CI- fail on bad lint~~ ✅
* Currently getting the FSP list in two places in the UI, FundsManagementTab and SettlementsTab. We
    should use the [Context API](https://reactjs.org/docs/context.html) or just get the FSP list at
    a higher level in the app. Or, can we pass the selector component around? Is that
    feasible/useful?
* Some components fetch data on every load- we should cache that. For example, going to the payment
    file tab, leaving it, then returning to it causes a fetch to occur again. It would be better if
    this didn't happen. Might need a state management lib for this later on :(. Could use meiosis.
* Factor out, consolidate common styles from various components.
* Make sure all dates are GMT. This could also be documented and somewhat enforced in the backend
    by having all date parameters match a regex for ISO8601 GMT strings (i.e. ending in 'Z').
* Rename components in line with the wireframes, currently "SettlementsTab" is really the
    "ParticipantsTab"
* Reorganise components into subdirectories corresponding to the wireframes
* Rename "Settlements" tab to "Participants" tab
* Change (newly renamed) "Participants" tab to follow the wireframe guidelines of List and Details
    overlay.
* "Payment files" tab should be subsumed into the settlements detail view
* "NDC Management" tab should be subsumed into the participants detail view
* "Funds Management" tab should be subsumed into the participants detail view
* Some of the layout should be tidied, especially the Paper components that aren't filling the
    space available to them, and look bad as a result.
* Horizontally and vertically center the login
* Add a logout button (probably will require a server call, then the server will probably need to
    expire the cookie, 'Set-Cookie': 'expiry: $yesterday' or trash the token in it 'Set-Cookie':
    'token=trash')
* Make sure when an item is selected in a list, it shows as selected
* Properly handle all request failures, including timeouts
* ~~Big lint branch to apply all lint fixes~~ ✅
* ~~eslint-plugin-jsx-a11y~~ ✅
* Add a reload/refresh button to the DateRangePicker?

# Create-React-App default README follows

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
