module.exports = {
  presets: [
    // 以当前 `Node` 版本为基础，把 `CommonJs` 转换成 `ESM`。
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // 支持 `TypeScript` 语法。
    '@babel/preset-typescript',
  ],
};