export interface BaseAction {
  type: string
}

export interface GenericAction extends Action {
  [extraProps: string]: any
}

export interface FetchAction extends Action {
	requestToMake: Promise<any>
}

export interface ActionCreator<A = GenericAction> {
	(...args: any[]): A
}

export interface Dispatch {
  (action: GenericAction): GenericAction 
}
