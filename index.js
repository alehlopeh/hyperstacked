/*
 * Hyperstacked
 *
*/

exports.mapHyperState = (state, map) => {
  return Object.assign(map, {
    tabCount: state && state.termGroups && state.termGroups.termGroups ? Array.from(Object.keys(state.termGroups.termGroups)).length : 0
  });
};

exports.decorateHyper = (Hyper, { React, notify, Notification }) => {
  return class extends Hyper{
    render(){
      const className = `hyperstacked`;

      return this.props.tabCount > 1 ? (
        React.createElement('div', Object.assign({}, { className }),
          React.createElement(Hyper, Object.assign({}, this.props, {}), this.props.customChildren)
        )) : super.render()
    }
  }
}

exports.decorateConfig = (config) => {
  const tabStackWidth = 200;
  
  return Object.assign({}, config, {
    tabStackWidth,
    css: `
      ${config.css || ''}

      .hyperstacked .hyper_main {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        position: absolute;
        width: 100%;
        overflow: hidden;
      }

      .hyperstacked header.header_header{
        top: initial;
        right: initial;
        left: initial;
        width: ${tabStackWidth}px;
        position: relative;
        height: 100%;
        margin: initial;
        flex: 1 1 20%;
        background: ${config.borderColor};
        border-top-right-radius: 0;
      }

      .hyperstacked ul.tabs_list {
        height: 100%!important;
        max-height: none;
        display: block;
        margin-left: 0;
      }

      .hyperstacked nav.tabs_nav {
        height: 100%;
      }

      .hyperstacked li.tab_tab,
      .hyperstacked .tabs_title {
        height: 34px;
        display: block;
        border-left-width:0;
        width: 100%;
        border-color:${config.backgroundColor}!important;
      }

      .hyperstacked li.tab_tab.tab_active{
        background: ${config.backgroundColor};
      }

      .hyperstacked li.tab_tab.tab_first,
      .hyperstacked .tabs_title {
        margin-left: 0;
        margin-top: 34px;
      }

      .hyperstacked .tab_textInner{
        text-align: left;
        padding-left: 30px;
      }

      .hyperstacked .terms_terms {
        box-sizing: border-box;
        flex: 5 1 80%;
        display: inline-flex;
        top: initial;
        right: initial;
        position: initial;
        left: initial;
        bottom: initial;
        margin-top: 34px;
        padding-bottom: 10px;
        margin-top:0;
      }`
  })
}
