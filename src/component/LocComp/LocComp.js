import React, { Component } from 'react';
import isEqual from 'pure-component/isEqual';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import I18n from '@gl/i18n';
import styles from './LocComp.style';


class LocComp extends Component {
    
    shouldComponentUpdate(nextProps) {
        const { customizer, dispatch, ...params } = this.props;
        const { customizer: nextCustomizer, dispatch: nextDispatch, ...nextParams } = nextProps;
        return !isEqual(params, nextParams);
    }

    render() {
        const { locKey, customizer, style, ellipsizeMode, numberOfLines, ...props } = this.props

        return (
            <Text style={[styles.text, style || {}]} ellipsizeMode={ ellipsizeMode || 'tail' } numberOfLines={ numberOfLines }>
                { customizer(I18n.t(locKey, props)) }
            </Text>
        );
    }
}


LocComp.defaultProps = {
    customizer: text => text,
};

LocComp.propTypes = {
    customizer: PropTypes.func,
    locKey: PropTypes.any.isRequired,
};


const mapStateToProps = ({ i18n }) => ({
    locale: i18n.locale,
    version: i18n.version,
});

export default connect(mapStateToProps)(LocComp);
