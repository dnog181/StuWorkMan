// This file is created by egg-ts-helper@2.1.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportPosts = require('../../../app/model/posts');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Posts: ReturnType<typeof ExportPosts>;
    User: ReturnType<typeof ExportUser>;
  }
}
