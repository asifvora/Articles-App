import AppNavigator from "../components/navigation/navigationStack";
const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams("SingIn")
);

const getCurrentRouteName = (state) => {
    const route = state.routes[state.index];
    return typeof route.index === 'undefined' ? route.routeName : getCurrentRouteName(route);
}
const navigationReducer = (state = initialState, action) => {
    const { routes, index } = state;
    const { routeName, params } = action;

    const currentTab = routes[index];

    const newState = AppNavigator.router.getStateForAction(action, state);

    /* logic to prevent double click and navigation,
    *  it will return new state only if current state is not same as new action route
    */
    if (state && newState) {
        const stateRouteName = getCurrentRouteName(state);
        const nextStateRouteName = getCurrentRouteName(newState);

        if (stateRouteName === nextStateRouteName) {
            return state;
        } else {
            // logic for removing existing screen from stack array
            let newStateChanged = newState.routes.map((firstSelector, indexId) => {
                indexId === 0 && firstSelector.routes.map((secondSelector, indexId2) => {
                    if (indexId2 === 0) {
                        return newSelector = secondSelector.routes.map((thirdSelector, indexId3) => {
                            if (thirdSelector.routeName === nextStateRouteName && indexId3 !== (secondSelector.routes.length - 1)) {
                                secondSelector.index = secondSelector.index - 1;
                                secondSelector.routes.splice(indexId3, 1);
                            }
                        })
                    } else {
                        return secondSelector;
                    }
                    return secondSelector;
                })
                return firstSelector
            });
            newStateChanged = {
                ...newState,
                routes: newStateChanged
            }
            //END of logic for removing existing screen from stack array
            return newState;
        }
    }
};

export default navigationReducer;

