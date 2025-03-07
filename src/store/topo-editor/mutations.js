import Vue from 'vue';

import {
    uid
} from 'quasar';

/**
 * 设置 当前选中的组件-单选
 * @param {*} state 
 * @param {*} component 
 */
export const setSelectedComponent = (state,component) => {    
    var fuid = uid;
    if(!component.identifier) {
        component.identifier = fuid();
    }    
    state.selectedComponents = [component.identifier];
    state.selectedComponentMap = {};
    Vue.set(state.selectedComponentMap,component.identifier,component);
    Vue.set(state,'selectedComponent',component);    
};

/**
 * 增加选中的组件--多选模式
 * @param {*} state 
 * @param {*} component 
 */
export const addSelectedComponent = (state,component) => {
    var fuid = uid;
    if(!component.identifier) {
        component.identifier = fuid();
    }    
    if(state.selectedComponentMap[component.identifier]) {
        return;
    }
    state.selectedComponents.push(component.identifier);
    Vue.set(state.selectedComponentMap,component.identifier,component);
    if(state.selectedComponents.length == 1)  {
        Vue.set(state,'selectedComponent',component);    
    } else {
        Vue.set(state,'selectedComponent',null);    
    }
};

/**
 * 将一个组件从已选中当中移除
 * @param {*} state 
 * @param {*} component 
 */
export const removeSelectedComponent = (state,component) => {
    if(!component.identifier)
        return;
    var index = -1;
    for(var i = 0; i < state.selectedComponents.length; i++) {
        if(state.selectedComponents[i] == component.identifier) {
            index = i;
            break;
        }
    }
    if(index > -1) {
        state.selectedComponents.splice(index,1);
    }    
    Vue.delete(state.selectedComponentMap,component.identifier);
    //如果移除的是选中组件
    if(state.selectedComponent != null && component.identifier == state.selectedComponent.identifier) {
        Vue.set(state,'selectedComponent',null); 
    }
    //如果只有一个组件，则默认选中
    if(state.selectedComponents.length == 1)  {
        var _component = state.selectedComponentMap[state.selectedComponents[0]];
        Vue.set(state,'selectedComponent',_component);
    }
};

/**
 * 清理所有选中的组件
 * @param {*} state 
 */
export const clearSelectedComponent = (state) => {
    state.selectedComponents = [];
    for(var key in state.selectedComponentMap) {
        Vue.delete(state.selectedComponentMap,key);
    }
    Vue.set(state,'selectedComponent',null); 
}

export const setLayerSelected = (state,selected) => {
    state.selectedIsLayer = selected;
}

export const setCopyFlag = (state,flag) => {
    state.copyFlag = flag;
    state.copyCount = 0;
}
export const increaseCopyCount = (state) => {
    state.copyCount++;
}