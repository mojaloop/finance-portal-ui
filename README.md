
Build: [![CircleCI](https://circleci.com/gh/casablanca-project/admin-portal-web-ui/tree/master.svg?style=svg&circle-token=7d9bb237974b5ceafd7016a7590286ecda049699)](https://circleci.com/gh/casablanca-project/admin-portal-web-ui/tree/master)

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
You'll need a running frontend-backend. See instructions for [admin-portal-web-ui-backend](
https://github.com/casablanca-project/admin-portal-web-ui-backend#running-locally).

Default port (3000):
```bash
make run
```
On a different port:
```bash
make run LISTEN_PORT=3001
```

### Natively
You'll need a running frontend-backend. See instructions for [admin-portal-web-ui-backend](
https://github.com/casablanca-project/admin-portal-web-ui-backend#running-locally).
```bash
npm install
npm start
```

## TODO
* Read a little more nginx documentation, consider creating a proper nginx config, because
  * Support client-side routing using browser pushState API
  * Customise logging
  * Support compression of (especially) responses

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
