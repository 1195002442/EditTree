This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start``npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `需求列表`

## `只有一个根目录`
else if (
      (info.dropToGap && info.dropPosition == -1 && dropKey == '0-1' && dropPosition == -1) ||
      (!info.dropToGap && info.dropPosition == 0 && dropKey == '0-1' && dropPosition == 0)
      // (info.dropToGap && info.dropPosition == -1  && dropPosition == -1) ||
      // (!info.dropToGap && info.dropPosition == 0  && dropPosition == 0)
    ) {
      //不允许拖到根节点外部
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    }
## `isOpera==true时，可以操作即增删改查和拖拽`
## `可以新增同级和子集，父级暂未实现`
 循环条件需要进一步优化



