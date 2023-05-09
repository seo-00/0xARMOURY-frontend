import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './Tools.css'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useState, useEffect } from 'react';

    {/*테스트 용 data */}
    const data = [
        {
          id: '1',
          label: 'Applications',
          children: [
            { id: '2', label: 'Calendar' },
            { id: '3', label: 'Email' },
          ],
        },
        {
          id: '4',
          label: 'Documents',
          children: [
            {
              id: '5',
              label: 'OSS',
            },
            {
              id: '6',
              label: 'MUI',
              children: [{ id: '7', label: 'index.js' }],
            },
          ],
        },
      ];
    {/*
    const [data, setData] = useState([]);

    useEffect(() => {
            axios.get('/api/test/)
            .then(response => setData(response.data))
            .catch(error => console.log(error))
        }, []);
 */}
    const RenderTree = ({nodes, onSelect}) => (
        <TreeItem 
        key={nodes.id} 
        nodeId={nodes.id}
        label={
        <Typography sx={{ fontSize: 23}}>{nodes.label}</Typography>}
        onClick={() => nodes.id>1 ? onSelect(nodes.id, nodes.label) : 0}
        >
        {/* id값으로 제일 상단의 트리아이템은 안불러오도록 지정?
            이렇게 해도 됨? */}

        {Array.isArray(nodes.children)
    ? nodes.children.map((node) => (
        <RenderTree
            nodes={{
            ...node,
            label: (
                <Typography sx={{ fontSize: 17 }}>{node.label}</Typography>
            ),
            }}
            onSelect={onSelect}
            key={node.id}
        />
        ))
    : null}
    </TreeItem>
);

function Tools(){

    const [selectedId, setSelectedId] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [str, setStr] = useState(null);
    const [selectedDefinition, setSelectedDefinition] = useState(null);

    const CircularJSON = require('circular-json');


    const handleSelect = (id, label) => {
        setSelectedId(id);
        setSelectedLabel(label);
        const jsonObject = JSON.parse(CircularJSON.stringify({ label }));
        // 'children' 있으면 Str에 children value저장
        if (jsonObject && jsonObject.label && jsonObject.label.props && jsonObject.label.props.children) {
          setStr(jsonObject.label.props.children);
        } else {
            //  'children' 앖으면 Str에 label저장
          setStr(jsonObject.label);
        }

        /* 정상 작동하는지는 모르겠지만 일단 데이터베이스에서 Definiton받아오는 코드//
        useEffect(() => {
            axios.get('/api/data/${id}')
            .then(response => setSelectedDefinition(response.data))
            .catch(error => console.log(error))
        }, []);
        */
    };

    return(
        <div>
            <div className='container-right'>
                <div className="sign-container">
                    <Link href ="./SignIn" color='#000000'>Sign In</Link>
                    <Link href="./SignUp" color='#000000'>Sign Up</Link>
                </div>
            </div>
            <div className="container">
                {/*logo*/}
                <Link href ="/">    
                    <Button startIcon={<img src="/img/armoury_logo.png" alt="Armoury" width={60} height={60}/>} sx={{
                    mr:1
                    ,fontSize:30
                    ,color:"black"
                    }}>
                    <strong>0xARMOURY</strong>
                    </Button>
                </Link>

                <div className='container-right'>
                    <div className='outline-container'>
                        <div className="button-container">
                            <Link href ="#" color='#000000'>Matric</Link>
                            <Link href="/tools" color='#0042ED'>Tools</Link>
                            <Link href ="training" color='#000000'>Training</Link>
                            <Link href ="#" color='#000000'>Gallery</Link>
                            <Link href ="#" color='#000000'>My page</Link>
                        </div>
                    </div>
                    
                    <Box sx={{ '& > :not(style)': { m: 1 } , justifyContent: "flex-end"}}>
                        <TextField
                            id="input-with-icon-textfield"
                            
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                <SearchIcon/>
                                </InputAdornment>
                            )
                            ,
                            }}
                            variant="standard"
                        />
                    </Box>
                </div>
            </div>
            <div className = 'division-line'></div>
            <div className='container-body1'>
                <div className='toolbox-left'>
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ height: 240, flexGrow: 1, width: '95%' }}
                        >
                        {data.map((node) => (
                            <RenderTree nodes={node} onSelect={handleSelect} key={node.id} />
                            ))}
                            
                    </TreeView> 
                </div>
                <div className='toolbox-right'>
                    <div className='tool-container-top'>
                    <div className='text-size'>
                        {str} 
                    </div>
                       
                        <div className='tool-container-right'>
                         <Button sx={{color: '#000000'}}>edit</Button>
                         <IconButton aria-label="bookmark">
                            <BookmarkBorderIcon sx={{width: 40, height: 40}} />
                        </IconButton>
                        </div>
                    </div>

                    <div className='tool-division-line'></div>
               
                    <div className='toolbox-right-body'>
                        <div className='toolbox-half'>
                            <div className='text-size2'>
                                Definition
                            </div>
                            <div className='toolbox-definition'>
                                <p>Nmap is a utility for network exploration or security auditing. It supports ping scanning (determine which hosts are up), many port scanning techniques, version detection (determine service protocols and application versions listening behind ports), and TCP/IP fingerprinting (remote host OS or device identification). Nmap also offers flexible target and port specification, decoy/stealth scanning, sunRPC scanning, and more. Most Unix and Windows platforms are supported in both GUI and commandline modes. Several popular handheld devices are also supported, including the Sharp Zaurus and the iPAQ.
                                    </p>
                                {/*<div>{selectedDefinition}</div> database에서 받아오면이렇게*/}
                            </div>
                            <div className='text-size2'>
                                Options
                            </div>
                            <div className='toolbox-option'>
                                <p>Nmap is a utility for network exploration or security auditing. It supports ping scanning (determine which hosts are up), many port scanning techniques, version detection (determine service protocols and application versions listening behind ports), and TCP/IP fingerprinting (remote host OS or device identification). Nmap also offers flexible target and port specification, decoy/stealth scanning, sunRPC scanning, and more. Most Unix and Windows platforms are supported in both GUI and commandline modes. Several popular handheld devices are also supported, including the Sharp Zaurus and the iPAQ.
                                </p>
                                <p>Nmap is a utility for network exploration or security auditing. It supports ping scanning (determine which hosts are up), many port scanning techniques, version detection (determine service protocols and application versions listening behind ports), and TCP/IP fingerprinting (remote host OS or device identification). Nmap also offers flexible target and port specification, decoy/stealth scanning, sunRPC scanning, and more. Most Unix and Windows platforms are supported in both GUI and commandline modes. Several popular handheld devices are also supported, including the Sharp Zaurus and the iPAQ.
                                </p>
                                <p>Nmap is a utility for network exploration or security auditing. It supports ping scanning (determine which hosts are up), many port scanning techniques, version detection (determine service protocols and application versions listening behind ports), and TCP/IP fingerprinting (remote host OS or device identification). Nmap also offers flexible target and port specification, decoy/stealth scanning, sunRPC scanning, and more. Most Unix and Windows platforms are supported in both GUI and commandline modes. Several popular handheld devices are also supported, including the Sharp Zaurus and the iPAQ.
                                </p>
                                <p>Nmap is a utility for network exploration or security auditing. It supports ping scanning (determine which hosts are up), many port scanning techniques, version detection (determine service protocols and application versions listening behind ports), and TCP/IP fingerprinting (remote host OS or device identification). Nmap also offers flexible target and port specification, decoy/stealth scanning, sunRPC scanning, and more. Most Unix and Windows platforms are supported in both GUI and commandline modes. Several popular handheld devices are also supported, including the Sharp Zaurus and the iPAQ.
                                    </p>
                                    <p>Nmap is a utility for network exploration or security auditing. It supports ping scanning (determine which hosts are up), many port scanning techniques, version detection (determine service protocols and application versions listening behind ports), and TCP/IP fingerprinting (remote host OS or device identification). Nmap also offers flexible target and port specification, decoy/stealth scanning, sunRPC scanning, and more. Most Unix and Windows platforms are supported in both GUI and commandline modes. Several popular handheld devices are also supported, including the Sharp Zaurus and the iPAQ.
                                    </p>

                            </div>
                            <div className='text-size2'>
                                MITRE ATT&CK
                            </div>
                            <div className='toolbox-mitre'>
                                
                            </div>
                        </div>

                        <div className='toolbox-half'>
                            <div className='text-size2'>
                                Execute
                            </div>
                            <div className='toolbox-exec'>

                            </div>
                            <div className='text-size2'>
                                Wiki
                                <IconButton aria-label="edit">
                                    <EditIcon sx={{width: 20, height: 20}} />
                                </IconButton>
                            </div>
                            <div className='toolbox-wiki'>

                            </div>
                        </div>
                    </div>
               
                </div>
            </div>
		</div>
		);
}
export default Tools;