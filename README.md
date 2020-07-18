This repository was setup to reproduce a tree-shaking issue with `react-popper-tooltip`. See: https://github.com/mohsinulhaq/react-popper-tooltip/issues/97

## How To Reproduce

1. Hit `yarn` to bootstrap the workspace.
2. Change directory to `ui-components` and hit `yarn build:rollup`.
3. Change directory to `my-app`, hit `yarn build` and then `yarn build:analyze`.
4. In the analyzer window, select `build/static/js/main.*.chunk.js` file and you should see just the Button component code.
5. Go to `ui-components/src/index.ts` and _**uncomment**_ `PopperTooltip`. Repeat steps 1-4, you should now see `react-popper-tooltip` code despite being unused by the application. You can also run `yarn check-treeshake` under `ui-components` to check whether tree-shaking was successful. However, with `react-popper-tooltip` it seems to fail fatally, so no real output. I suggest inspecting the output of `ui-components/dist/esm/index.js`.
