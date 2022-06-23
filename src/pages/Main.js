import React from 'react';
import { Button, IconButton, Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import { toJS } from 'mobx';
import { useLocalStore, useObserver, observable } from 'mobx-react';
import moment from 'moment';
import 'moment/locale/ko';

import useStore from '../common/useStore';
import Const from "../common/Const";
import '../css/Main.css';
import Util from '../common/Util';

function Main({ location, history }) {

    const { commonStore } = useStore();

    const data = useLocalStore(() => ({
        pageMode: Const.PAGE_MODE.VIEW,
        showContents: [],
        characterList: [],

        date: moment().format('YYYY-MM-DD'),
    }));

    function onAdd() {
        data.characterList.push({
            idx: Math.random(),
            name: '캐릭터명',
            items: Const.CONTENTS,
        });
    }

    function onReg() {
        data.pageMode = Const.PAGE_MODE.VIEW;
        save();
    }

    function onMod() {
        data.pageMode = Const.PAGE_MODE.MOD;
    }

    function save() {
        window.localStorage.setItem('data', JSON.stringify(data.characterList));
    }

    async function init() {
        let localData = JSON.parse(window.localStorage.getItem('data'));
        if(localData) {
            localData = localData[0].items;
            for(let i=0; i<localData.length; i++) {
                if(!localData[i].hide) {
                    data.showContents.push(localData[i].id);
                }
            }
            data.characterList = JSON.parse(window.localStorage.getItem('data'));
        }
        else {
            data.characterList = [];
            data.showContents = [];
            data.characterList.push({
                idx: Math.random(),
                name: '캐릭터명',
                items: Const.CONTENTS,
            });

            for(let i=0; i<Const.CONTENTS.length; i++) {
                data.showContents.push(Const.CONTENTS[i].id);
            }
        }
    }

    function ContensHeader() {
        return useObserver(() => (
            <div className="table-header">
                <div className='title-blank'></div>
                {Const.CONTENTS.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                        {data.showContents.indexOf(item.id) > -1 &&
                        <div className="value-header-caontainer">
                            <span className={'header-icon id-'+item.id}></span>
                            <span className="header-title">{item.name}</span>
                            {/* {data.pageMode == Const.PAGE_MODE.MOD &&
                            <input type="checkbox" className='' checked={data.showContents.indexOf(item.id) > -1} onChange={()=>{}}/>
                            } */}
                        </div>}
                        </React.Fragment>
                    )
                })}
            </div>
        ));
    }

    function CharacterHeader(props) {
        function delCharacter(item) {
            let idx = Util.indexOf(data.characterList, item, 'idx');
            console.log(idx);
            data.characterList.splice(idx,1);
        }

        return useObserver(() => (
            <div className="char-header-container">
                {data.pageMode == Const.PAGE_MODE.VIEW &&
                <span>{props.data.name}</span>}
                {data.pageMode == Const.PAGE_MODE.MOD &&
                <>
                <input className="input" type="text" value={props.data.name} onChange={(e)=>{props.data.name = e.target.value}}/>
                <IconButton className="btn-delete" aria-label="delete" onClick={() => {delCharacter(props.data)}}>
                    <DeleteIcon />
                </IconButton>
                </>
                }
            </div>
        ));
    }
    function Charactor(props) {
        function onCheck(data) {
            data.value = !data.value;
            save();
        }
        return useObserver(() => (
            <div key={props.data.idx} className="char-component">
            <CharacterHeader data={props.data}/>
            
            {props.data.items.map((data, index) => {
                return (
                    <React.Fragment key={index}>
                    {!data.hide &&
                    <div key={props.data.idx+index} className="char-value-container">
                        <div className='cb-area' onClick={()=>{onCheck(data)}}>
                            <input type="checkbox" checked={data.value} onChange={()=>{}}/>
                        </div>
                    </div>}
                    </React.Fragment>
                )
            })}
        </div>
        ));
    }

    React.useEffect(() => {
        init();
        return () => {

        };
    }, // eslint-disable-next-line
    []);

    return useObserver(() => (
        <>
        <div className="hw-container">
            <div className="hw-header">
                <h1>로아 숙제도우미</h1>
            </div>
            <div className="hw-btn-container">
                {data.pageMode == Const.PAGE_MODE.VIEW &&
                <Button className="btn M def" onClick={onMod}>수정</Button>}
                {data.pageMode == Const.PAGE_MODE.MOD &&
                <Button className="btn M ok" onClick={onReg}>저장</Button>}
            </div>
            <div className={'hw-contens '+(data.pageMode == Const.PAGE_MODE.MOD ? 'mod': '')}>
                <ContensHeader/>
                {data.characterList.map((item, index) => {
                    return (
                        <Charactor key={index} data={item}/>
                    )
                })}
                
                {data.pageMode == Const.PAGE_MODE.MOD &&
                <div className="add-component">
                    <button className='char-add-btn' onClick={onAdd}>+</button>
                </div>
                }
                </div>
            </div>
        </>
    ));
}

export default Main;
