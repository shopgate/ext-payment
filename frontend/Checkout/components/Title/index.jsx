import React from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import * as style from './style';

/**
 * @return {*}
 */
const Title = () => (
  <h3 className={style.title}>
    <I18n.Text string="checkout.title" />
  </h3>
);

export default Title;
