/**
 * 一个高阶组件功能是为老的组件(传递进来的Comp)新增一个handleChange方法，然后返回一个带有这个方法的新的组件
 * 这是个幼儿园级别的高阶组件
 */
import React from 'react';
export default function Form(Comp){
    return class WrapperComp extends React.Component{
        state={}
        handleChange=(key,val)=>{
            // console.log(key,val);
           this.setState({
               [key]:val
           })
        }

        render(){
            return <Comp handleChange={this.handleChange} state={this.state}　{...this.props}></Comp>  
            //把所有的属性都传递进来，直接展开this.props就可以了
        }
    }
} 