import React,{ useContext,useState,useEffect } from 'react';
import {Admin, Resource, MenuItemLink,useDataProvider} from 'react-admin';
import { Box, Button, Menu } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {Layout, AppBar, theme} from '@semapps/archipelago-layout';

import { ContextUnivers, ContextUniversProvider} from './univers';

import { useHistory,useParams,useLocation } from 'react-router-dom';
import queryString from 'query-string';

const UniversMenus=props=>{
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const history = useHistory();
  const universContext = useContext(ContextUnivers);
  const defaultUnivers='globale';
  const prefixNextSearch  = history.location.search?history.location.search+'&':'?';
  const parsed = queryString.parse(history.location.search);
  const dataProvider = useDataProvider();
  const [branches,setBranches] = useState();
  const currentBranch = branches && branches.find(b=>b['@id']==parsed.univers);
  const currentBranchLabel = currentBranch?currentBranch['pair:label']:parsed.univers;
  useEffect(() => {
    console.log(universContext);

    if(parsed.univers){
      if(parsed.univers!==universContext.state){
            universContext.dispatch({type: 'changeUnivers', payload: parsed.univers});
      }
    }else{
      history.replace({
        search:'?'+queryString.stringify({
          ...parsed,
          univers:universContext.state
        })
      })
    }
    if(!branches){
      dataProvider.getList('Branch',{'@id':process.env.REACT_APP_MIDDLEWARE_URL + 'branchs'}).then(branches=>{
          setBranches(branches.data);
      })
    }
  });

  return <Box spacing={2}>
        <Button variant="outlined" onClick={handleMenu} endIcon={<ArrowDropDownIcon />}>
          {currentBranchLabel}
        </Button>
        <Menu
          id="menu-univers-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={handleClose}
        >
            <MenuItemLink
              to={{
                search:'?'+queryString.stringify({
                  ...parsed,
                  univers:'global'
                })
              }}
              key="global"
              primaryText="global"
              leftIcon={<EditIcon />}
              onClick={handleClose}
            />
            {branches && branches.map(b=>{
              return <MenuItemLink
                to={{
                  search:'?'+queryString.stringify({
                    ...parsed,
                    univers:b['@id']
                  })
                }}
                primaryText={b['pair:label']}
                leftIcon={<EditIcon />}
                onClick={handleClose}/>
            })}
        </Menu>
      </Box>

}




export default UniversMenus;
