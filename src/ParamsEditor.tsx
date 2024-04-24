import React from "react";
import './index.css'

type ParamType = `string`
type ColorType = `#${string}`
interface Param {
    id: number;
    name: string;
    type: ParamType
}
interface ParamValue {
    paramId: number;
    value: string;
}

interface Color {
    paramId: number,
    color: ColorType
}

interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface ParamEditorInputProps {
    id: number,
    name: string,
    value: string,
    type: ParamType,
    color: ColorType
}

interface State {
    paramEditorInputs: ParamEditorInputProps[]
}

export default class ParamEditor extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = this.getInitState(props);
    };

    public getModel(): Model {
        return {
            paramValues: this.state.paramEditorInputs.map(input => ({
                paramId: input.id,
                value: input.value,
            })),
            colors: this.state.paramEditorInputs.map(input => ({
                paramId: input.id,
                color: input.color,
            }))
        };
    };

    private getInitState(props: Props): State {
        return {
            paramEditorInputs: props.params.map(param => ({
                id: param.id,
                name: param.name,
                type: param.type,
                value: props.model.paramValues.find(paramValues => paramValues.paramId === param.id)?.value || '',
                color: props.model.colors.find(colors => colors.paramId === param.id)?.color || '#111111',
            }))
        };
    };

    private onChangeHandler(e: React.ChangeEvent<HTMLDivElement>){
        if(!e.target.id) return;
        const value = (e.target as HTMLInputElement).value;
        this.setState({
            ...this.state,
            paramEditorInputs: this.state.paramEditorInputs.map(input =>
                +e.target.id !== input.id ?
                    input :
                    {...input, value: value}
            )
        });
    };

    render() {
        return (
            <div className={'paramEditor-container'} onChange={this.onChangeHandler.bind(this)}>
                {this.state.paramEditorInputs.map(input =>
                    <ParamEditorInput {...input}/>
                )}
            </div>
        );
    };
};

class ParamEditorInput extends React.PureComponent<ParamEditorInputProps>{
    render() {
        return <>
            <label htmlFor={this.props.id.toString()}>{this.props.name}</label>
            <input {...{
                style: {...{color: this.props.color}},
                name: this.props.name,
                id: this.props.id.toString(),
                value: this.props.value,
            }}/>
        </>
    };
}