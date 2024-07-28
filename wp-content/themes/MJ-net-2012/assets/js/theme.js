import $ from 'jquery'; // eslint-disable-line import/no-extraneous-dependencies
import '../scss/style.scss';
import FrontEndUtils from './common/frontend.js';

const frontEndUtils = new FrontEndUtils();

// eslint-disable-next-line no-unused-vars
$(() => {
  frontEndUtils.init();
});
