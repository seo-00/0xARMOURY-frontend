import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './Tools.css'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Modal from '@mui/material/Modal';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SchoolIcon from '@mui/icons-material/School';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme, isActive }) => ({
    backgroundColor: isActive ? '#6799FF' : (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
    ...theme.typography.body2,
    padding: theme.spacing(1),
    border: '1px solid #A6A6A6',
    textAlign: 'center',
    color: 'black',
    flexGrow: 1,
    minWidth: '95px',
    cursor: 'pointer',
  }));

const categoryList = [
    {id: '1',
     label: 'Information Gathering',},
    {id: '2',
     label: 'Vulnerability Analysis',},
    {id: '3',
     label: 'Web Application Analysis',},
    {id: '4',
     label: 'Database Assessment',},
     {id: '5',
     label: 'Password Attacks',},
     {id: '6',
     label: 'Wireless Attacks',},
     {id: '7',
     label: 'Reverse Engineering',},
     {id: '8',
     label: 'Exploitation Tools',},
     {id: '9',
     label: 'Sniffing & Spoofing',},
     {id: '10',
     label: 'Post Exploitation',},
     {id: '11',
     label: 'Forensics',},
     {id: '12',
     label: 'Reporting Tools',},
  ];

    {/*
    const [data, setData] = useState([]);

    useEffect(() => {
            axios.get('/api/test/)
            .then(response => setData(response.data))
            .catch(error => console.log(error))
        }, []);
 */}
    const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.black,
          },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
            maxWidth: 'none',
            fontFamily: 'consoles', // 원하는 폰트 패밀리로 변경
            fontWeight: 600
        },
    }));

    const LightTooltip2 = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
            [`& .${tooltipClasses.arrow}`]: {
                color: theme.palette.common.black,
              },
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: '#f5f5f9',
                color: 'rgba(0, 0, 0, 0.87)',
                maxWidth: 220,
                fontSize: theme.typography.pxToRem(12),
                border: '1px solid #dadde9',
                maxWidth: 'none',
                fontFamily: 'consoles', // 원하는 폰트 패밀리로 변경
                fontWeight: 600
            },
        }));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
function Tools(){
    const [fullscreen, setFullscreen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("Title");
    const [Toolcode, setToolCode] = useState("여기는 표식체계 자리");
    const [Tooldefintion, setTooldefinition]=useState("여기는 툴 설명\n아 여기네ㅎ");
    const [Tooloption, setTooloption]=useState("여기는 옵션 설명\n제발돼라ㅏㅏㅏㅏ");
    const [ToolMITRE, setToolMITRE]=useState([]);
    const [ToolWiki, setToolWiki] = useState("기본 위키 내용\n여기두");
    const [isEditing, setIsEditing] = useState(false);
    const [editedWiki, setEditedWiki] = useState(ToolWiki);
    const [toollist, setToollist] = useState([]);

    const [MitreTip, setMitreTip] = useState("");

    const badge = localStorage.getItem('badge');

    const [category, setCategory] = useState('');
    const [tool, setTool] = useState('');
    const [activeItemIds, setActiveItemIds] = useState([]);
    const [tooltipInfo, setTooltipInfo] = useState('');

    const [ClickItemIds, setClickItemIds] = useState('');
    // Tooltip

    const handleItemClick = async (itemId) => {
        try {
          // itemId에 해당하는 정보를 서버에서 가져옴
          const response = await axios.get(`API/${itemId}`);
          if(response.data.isSuccess)
          {
            const itemInfo = response.data.result;
            setClickItemIds(itemId.toString());
            console.log(itemId);
            // 받아온 정보를 상태에 저장하여 툴팁으로 표시
             setMitreTip(itemInfo);
          }
          
        } catch (error) {
          console.error('Error fetching item information:', error);
        }
      };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const handleOpen = () => {
        const bottomContainer = document.getElementById('bottomContainer');
        bottomContainer.scrollIntoView({ behavior: 'smooth' });
      };

    const handleChange1 = (event) => {
        setCategory(event.target.value);
        ToolList(event.target.value);
      };
  
      const HandleChange2 = (event) => {
        const selectedTool = event.target.value;
        setTool(selectedTool);
        handleSelect(event.target.value);
      };
 
    const ToolList = async (category) => {
        try {
            const response = await axios.get('/tools/category/' + category);
            setToollist(response.data.result);
  
            const processedTool = response.data.result.map(item => ({
                toolIdx: item.toolIdx,
                toolName: item.toolName,
              }));
              setToollist(processedTool);
          } catch (error) {
            console.error('Tool:', error);
          }
      }; 

      useEffect(() => {
        if (tool) {
          axios
            .get(`/tools/AML/${tool}`)
            .then(function (response) {
              if(response.data.isSuccess){
                const result = response.data.result;
                const simulatedServerData = { itemIds: result };
                setActiveItemIds(simulatedServerData.itemIds);
              }
              else{
                console.log('error');
              }
            })
            .catch(function (error) {
              // Error handling
            });
        }
      }, [tool]);

    const handleEdit = () => {
      setIsEditing(true);
      setEditedWiki(ToolWiki);
    };
  
   
    const handleSave = () => {
        // 수정된 정보를 서버로 전송
        const updatedData = {
          toolIdx: selectedId, // 수정한 데이터의 id
          wikiInfo: editedWiki, // 수정한 내용
        };
      
        axios.post('/tools/update/wiki', updatedData,{
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })
          .then(response => {
            // 서버 응답 처리
            if(response.data.isSuccess)
            {
                console.log(response.data);
                setToolWiki(editedWiki); // 수정한 내용으로 업데이트
                setIsEditing(false); // 편집 모드 종료
            }
            else{
                alert('마스터 등급만 위키 수정이 가능해요~');
            }
          })
          .catch(error => {
            // 오류 처리
            console.log(error);
          });
      };
  
    const handleCancel = () => {
      setIsEditing(false);
    };
  
    const handleChange = (event) => {
      setEditedWiki(event.target.value);
    };



    const CircularJSON = require('circular-json');

    const handleOpenFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleSelect = (id) => {
        setSelectedId(id);

        fetchData(id)
          .then((response) => {
            const { toolName, definition, options, wikiInfo, aml } = response.toolInfo;
            const mitreInfo = response.mitreInfo;

            setToolMITRE(mitreInfo);
            console.log(ToolMITRE);
            setSelectedLabel(toolName);
            setTooldefinition(definition);
            setTooloption(options);
            setToolWiki(wikiInfo);
            setToolCode(aml);
            // setToolCode(code);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
      
      async function fetchData(id) {
        try {
          const response1 = await axios.get(`tools/${id}`);
          const response2 = await axios.get(`tools/mitreInfo/${id}`);
          return {
            toolInfo: response1.data.result,
            mitreInfo: response2.data.result
        };
        } catch (error) {
          throw error;
        }
      }

    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickName");
        localStorage.removeItem("email");
        localStorage.removeItem("badge");
    }

    return(
        <div>
            <div className='container-right'>
                <div>
                        <div>
                        {
                            localStorage.getItem("accessToken") == null
                            ?<div className="sign-container"><Link href ="./SignIn" color='#000000'>Sign In</Link>
                            <Link href="./SignUp" color='#000000'>Sign Up</Link></div>
                            :<div className="sign-container">
                                <div>
                                    <SchoolIcon style={{ color: badge > 5 ? '#F15F5F' : '#6B66FF', verticalAlign: 'bottom', marginRight: 8}}/> 
                                    <Link href ="#" color='#000000'>          
                                        {localStorage.getItem('nickName')}
                                    </Link>
                                </div>
                            <Link href="./" onClick={Logout} color='#000000'>logout</Link></div>
                        }
                        </div>
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
                            <Link href ="./Matrix" color='#000000'>Matrix</Link>
                            <Link href="./tools" color='#0042ED'>Tools</Link>
                            <Link href ="./Training" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
                            <Link href ="./MyTools" color='#000000'>My page</Link>
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
            <div className='tools-title'>
                     TOOLS LIST
                    </div>
                    <div className = 'tool-division-line2'></div>
                <div className='tool-box-select'> 
                    <FormControl sx={{ m: 1, width: 270, bgcolor: 'white'}}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleChange1}
                        MenuProps={MenuProps}
                        sx={{ maxHeight: '50px', fontSize: '16px'}}
                        >
                        {categoryList.map((item) => (
                            <MenuItem value={item.id}> {item.label}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 270, bgcolor: 'white'}}>
                        <InputLabel id="demo-simple-select-label">Tool</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tool}
                        label="Tool"
                        onChange={HandleChange2}
                        MenuProps={MenuProps}
                        sx={{ maxHeight: '50px', fontSize: '16px' }}
                        >
                        {toollist.map((item) => (
                            <MenuItem value={item.toolIdx}> {item.toolName}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </div>
                <div className = 'tool-division-line2'></div>
            </div>
                
                <div className='toolbox-right'>
                    <div className='tool-container-top'>
                    <LightTooltip title={
                        <React.Fragment>
                            <Typography color="black" fontSize={"15px"} fontFamily="consolas" fontWeight={"700"}>AML Code</Typography>
                            {Toolcode}
                        </React.Fragment>
                        } placement="top-start" arrow>
                        <Button sx={{color: "black", fontSize:"20px"}}>{selectedLabel}</Button>
                    </LightTooltip>
                       
                        <div className='tool-container-right'>
                         <IconButton aria-label="bookmark">
                            <BookmarkBorderIcon sx={{width: 40, height: 40}} />
                        </IconButton>
                        </div>
                    </div>

                    <div className='tools-division-line'></div>
               
                    <div className='toolbox-right-body'>
                        <div className='toolbox-half'>
                            <div className='text-size2'>
                                Definition
                            </div>
                            <div className='toolbox-definition'>
                                <p>{Tooldefintion && Tooldefintion.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}</p>
                            </div>
                            <div className='text-size2'>
                                Options
                            </div>
                            <div className='toolbox-option'>
                                <p>{Tooloption && Tooloption.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}</p>

                            </div>
                            <div className='text-size2'>
                                MITRE ATT&CK
                                <IconButton aria-label="View Matrix" sx={{color:"black"}} onClick={handleOpen}>
                                    <ImageSearchIcon/>
                                </IconButton>
                                
                            </div>
                            <div className='toolbox-mitre'>
                             <ul>
                                {ToolMITRE.map((category) => (
                                    <li key={category.tacticName}>
                                        {category.tacticName}
                                        <ul>
                                            {category.techniques.map((technique) => (
                                            <li key={technique.name}>
                                                <Link href={technique.url} color="inherit" underline="always" target="_blank" rel="noopener noreferrer">
                                                    {technique.name}
                                                </Link>
                                            </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </div>

                        <div className='toolbox-half'>
                            <div className='text-size2'>
                                Execute
                                <IconButton aria-label="expand screen">
                                    {fullscreen ? (
                                        <FullscreenExitIcon onClick={handleOpenFullscreen} sx={{ width: 20, height: 20, color: "#000000" }} />
                                    ) : (
                                        <FullscreenIcon onClick={handleOpenFullscreen} sx={{ width: 20, height: 20, color: "#000000" }} />
                                    )}
                                </IconButton>
                            </div>
                            <iframe className={`toolbox-exec ${fullscreen ? 'fullscreen' : ''}`} src="http://localhost:5901/cast"></iframe>


                            <div className='text-size2'>
                                Wiki
                                <IconButton aria-label="edit">
                                    <EditIcon onClick={handleEdit} sx={{width: 20, height: 20}} />
                                </IconButton>
                            </div>
                            {isEditing ? (
                                <div>
                                <textarea 
                                className='toolbox-wiki' 
                                value={editedWiki}
                                onChange={handleChange} 
                                rows={14} // 원하는 세로 길이로 조정
                                style={{ resize: 'none', height: 'auto' }} // 크기 조절 비활성화 및 자동 높이 조정
                                 />
                                 <div style={{ display: "flex", gap: "10px" }}>
                                <Button variant="outlined" onClick={handleSave} sx={{color:"bluek", borderColor: "blue"}}>Save</Button>
                                <Button variant="outlined" onClick={handleCancel} sx={{color:"red", borderColor: "red"}}>Cancel</Button>
                                </div>
                                </div>
                            ) : (
                                <div className={`toolbox-wiki ${fullscreen ? 'toolbox-wiki-fullscreen' : ''}`}>
                                <p>{ToolWiki && ToolWiki.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}</p>
                                </div>
                            )}
                        </div>
                    </div>
               
                </div>
            </div>
            <div className='container-body1' id='bottomContainer'>
                            
                            <div className='tool-matrix-box'>
                                <div className='matrix-box-top'> 
                                    <div className='matrix-text-tactic'>Reconnaiss-ance</div>
                                    <div className='matrix-text-tactic'>Resource Development</div>
                                    <div className='matrix-text-tactic'>Initial Access</div>
                                    <div className='matrix-text-tactic'>Execution</div>
                                    <div className='matrix-text-tactic'>Persistence</div>
                                    <div className='matrix-text-tactic'>Privilege Escalation</div>
                                    <div className='matrix-text-tactic'>Defense Evasion</div>
                                    <div className='matrix-text-tactic'>Credential Access</div>
                                    <div className='matrix-text-tactic'>Discovery</div>
                                    <div className='matrix-text-tactic'>Lateral Movement</div>
                                    <div className='matrix-text-tactic'>Collection</div>
                                    <div className='matrix-text-tactic'>Command and Control</div>
                                    <div className='matrix-text-tactic'>Exfiltration</div>
                                    <div className='matrix-text-tactic'>Impact</div>
                                </div>
                                <div className='matrix-division-line3'></div>
                                <div className='tool-matrix-box-content'>
                                  <Box sx={{ width: 110, margin: 1 }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                    <Item key="RC-1" isActive={activeItemIds.includes('RC-1')} onClick={() => handleItemClick('RC-1')}>
                                        {ClickItemIds === 'RC-1' ? (
                                        <LightTooltip2 title={MitreTip} placement="right">
                                            <Typography variant="body2">Active Scanning</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Active Scanning</Typography>
                                        )}
                                    </Item>
                                    <Item key="RC-2" isActive={activeItemIds.includes('RC-2')} onClick={() => handleItemClick('RC-2')}>
                                        {ClickItemIds === 'RC-2' ? (
                                        <LightTooltip2 title={MitreTip} placement="right">
                                            <Typography variant="body2">Gather Victim Host Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Gather Victim Host Information</Typography>
                                        )}</Item>
                                      <Item key="RC-3" isActive={activeItemIds.includes('RC-3')}>Gather Victim Identity Information</Item>
                                      <Item key="RC-4" isActive={activeItemIds.includes('RC-4')}>Gather Victim Network Information</Item>
                                      <Item key="RC-5" isActive={activeItemIds.includes('RC-5')}>Gather Victim Org Information</Item>
                                      <Item key="RC-6" isActive={activeItemIds.includes('RC-6')}>Phishing for Information</Item>
                                      <Item key="RC-7" isActive={activeItemIds.includes('RC-7')}>Search Closed Sources</Item>
                                      <Item key="RC-8" isActive={activeItemIds.includes('RC-8')}>Search Open Technical Databases</Item>
                                      <Item key="RC-9" isActive={activeItemIds.includes('RC-9')}>Search Open Websites/ Domains</Item>
                                      <Item key="RC-10" isActive={activeItemIds.includes('RC-10')}>Search Victim-Owned Websites</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="RD-1" isActive={activeItemIds.includes('RD-1')}>Acquire Access</Item>
                                      <Item key="RD-2" isActive={activeItemIds.includes('RD-2')}>Acquire Infrastructure</Item>
                                      <Item key="RD-3" isActive={activeItemIds.includes('RD-3')}>Compromise Accounts</Item>
                                      <Item key="RD-4" isActive={activeItemIds.includes('RD-4')}>Compromise Infrastructure</Item>
                                      <Item key="RD-5" isActive={activeItemIds.includes('RD-5')}>Develop Capabilities</Item>
                                      <Item key="RD-6" isActive={activeItemIds.includes('RD-6')}>Establish Accounts</Item>
                                      <Item key="RD-7" isActive={activeItemIds.includes('RD-7')}>Obtain Capabilities</Item>
                                      <Item key="RD-8" isActive={activeItemIds.includes('RD-8')}>Stage Capabilities</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="IA-1" isActive={activeItemIds.includes('IA-1')}>Drive-by Compromise</Item>
                                      <Item key="IA-2" isActive={activeItemIds.includes('IA-2')}>Exploit Public-Facing Application</Item>
                                      <Item key="IA-3" isActive={activeItemIds.includes('IA-3')}>External Remote Services</Item>
                                      <Item key="IA-4" isActive={activeItemIds.includes('IA-4')}>Hardware Additions</Item>
                                      <Item key="IA-5" isActive={activeItemIds.includes('IA-5')}>Phishing</Item>
                                      <Item key="IA-6" isActive={activeItemIds.includes('IA-6')}>Replication Through Removable Media</Item>
                                      <Item key="IA-7" isActive={activeItemIds.includes('IA-7')}>Supply Chain Compromise</Item>
                                      <Item key="IA-8" isActive={activeItemIds.includes('IA-8')}>Trusted Relationship</Item>
                                      <Item key="IA-9" isActive={activeItemIds.includes('IA-9')}>Valid Accounts</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="EX-1" isActive={activeItemIds.includes('EX-1')}>Cloud Administration Command</Item>
                                      <Item key="EX-2" isActive={activeItemIds.includes('EX-2')}>Command and Scripting Interpreter</Item>
                                      <Item key="EX-3" isActive={activeItemIds.includes('EX-3')}>Container Administration Command</Item>
                                      <Item key="EX-4" isActive={activeItemIds.includes('EX-4')}>Deploy Container</Item>
                                      <Item key="EX-5" isActive={activeItemIds.includes('EX-5')}>Exploitation for Client Execution</Item>
                                      <Item key="EX-6" isActive={activeItemIds.includes('EX-6')}>Inter-Process Communication</Item>
                                      <Item key="EX-7" isActive={activeItemIds.includes('EX-7')}>Native API</Item>
                                      <Item key="EX-8" isActive={activeItemIds.includes('EX-8')}>Scheduled Task/Job</Item>
                                      <Item key="EX-9" isActive={activeItemIds.includes('EX-9')}>Serverless Execution</Item>
                                      <Item key="EX-10" isActive={activeItemIds.includes('EX-10')}>Shared Modules</Item>
                                      <Item key="EX-11" isActive={activeItemIds.includes('EX-11')}>Software Deployment Tools</Item>
                                      <Item key="EX-12" isActive={activeItemIds.includes('EX-12')}>System Services</Item>
                                      <Item key="EX-13" isActive={activeItemIds.includes('EX-13')}>User Execution</Item>
                                      <Item key="EX-14" isActive={activeItemIds.includes('EX-14')}>Windows Management Instrumentation</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="PR-1" isActive={activeItemIds.includes('PR-1')}>Account Manipulation</Item>
                                      <Item key="PR-2" isActive={activeItemIds.includes('PR-2')}>BITS Jobs</Item>
                                      <Item key="PR-3" isActive={activeItemIds.includes('PR-3')}>Boot or Logon Autostart Execution</Item>
                                      <Item key="PR-4" isActive={activeItemIds.includes('PR-4')}>Boot or Logon Initialization Scripts</Item>
                                      <Item key="PR-5" isActive={activeItemIds.includes('PR-5')}>Browser Extensions</Item>
                                      <Item key="PR-6" isActive={activeItemIds.includes('PR-6')}>Compromise Client Software Binary</Item>
                                      <Item key="PR-7" isActive={activeItemIds.includes('PR-7')}>Create Account</Item>
                                      <Item key="PR-8" isActive={activeItemIds.includes('PR-8')}>Create or Modify System Process</Item>
                                      <Item key="PR-9" isActive={activeItemIds.includes('PR-9')}>Event Triggered Execution</Item>
                                      <Item key="PR-10" isActive={activeItemIds.includes('PR-10')}>External Remote Services</Item>
                                      <Item key="PR-11" isActive={activeItemIds.includes('PR-11')}>Hijack Execution Flow</Item>
                                      <Item key="PR-12" isActive={activeItemIds.includes('PR-12')}>Implant Internal Image</Item>
                                      <Item key="PR-13" isActive={activeItemIds.includes('PR-13')}>Modify Authentication Process</Item>
                                      <Item key="PR-14" isActive={activeItemIds.includes('PR-14')}>Office Application Startup</Item>
                                      <Item key="PR-15" isActive={activeItemIds.includes('PR-15')}>Pre-OS Boot</Item>
                                      <Item key="PR-16" isActive={activeItemIds.includes('PR-16')}>Scheduled Task/Job</Item>
                                      <Item key="PR-17" isActive={activeItemIds.includes('PR-17')}>Server Software Component</Item>
                                      <Item key="PR-18" isActive={activeItemIds.includes('PR-18')}>Traffic Signaling</Item>
                                      <Item key="PR-19" isActive={activeItemIds.includes('PR-19')}>Valid Accounts</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="PE-1" isActive={activeItemIds.includes('PE-1')}>Abuse Elevation Control Mechanism</Item>
                                      <Item key="PE-2" isActive={activeItemIds.includes('PE-2')}>Access Token Manipulation</Item>
                                      <Item key="PE-3" isActive={activeItemIds.includes('PE-3')}>Boot or Logon Autostart Execution</Item>
                                      <Item key="PE-4" isActive={activeItemIds.includes('PE-4')}>Boot or Logon Initialization Scripts</Item>
                                      <Item key="PE-5" isActive={activeItemIds.includes('PE-5')}>Create or Modify System Process</Item>
                                      <Item key="PE-6" isActive={activeItemIds.includes('PE-6')}>Domain Policy Modification</Item>
                                      <Item key="PE-7" isActive={activeItemIds.includes('PE-7')}>Escape to Host</Item>
                                      <Item key="PE-8" isActive={activeItemIds.includes('PE-8')}>Event Triggered Execution</Item>
                                      <Item key="PE-9" isActive={activeItemIds.includes('PE-9')}>Exploitation for Privilege Escalation</Item>
                                      <Item key="PE-10" isActive={activeItemIds.includes('PE-10')}>Hijack Execution Flow</Item>
                                      <Item key="PE-11" isActive={activeItemIds.includes('PE-11')}>Process Injection</Item>
                                      <Item key="PE-12" isActive={activeItemIds.includes('PE-12')}>Scheduled Task/Job</Item>
                                      <Item key="PE-13" isActive={activeItemIds.includes('PE-13')}>Valid Accounts</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="DE-1" isActive={activeItemIds.includes('DE-1')}>Abuse Elevation Control Mechanism</Item>
                                      <Item key="DE-2" isActive={activeItemIds.includes('DE-2')}>Access Token Manipulation</Item>
                                      <Item key="DE-3" isActive={activeItemIds.includes('DE-3')}>BITS Jobs</Item>
                                      <Item key="DE-4" isActive={activeItemIds.includes('DE-4')}>Build Image on Host</Item>
                                      <Item key="DE-5" isActive={activeItemIds.includes('DE-5')}>Debugger Evasion</Item>
                                      <Item key="DE-6" isActive={activeItemIds.includes('DE-6')}>Deobfuscate/ Decode Files or Information</Item>
                                      <Item key="DE-7" isActive={activeItemIds.includes('DE-7')}>Deploy Container</Item>
                                      <Item key="DE-8" isActive={activeItemIds.includes('DE-8')}>Direct Volume Access</Item>
                                      <Item key="DE-9" isActive={activeItemIds.includes('DE-9')}>Domain Policy Modification</Item>
                                      <Item key="DE-10" isActive={activeItemIds.includes('DE-10')}>Execution Guardrails</Item>
                                      <Item key="DE-11" isActive={activeItemIds.includes('DE-11')}>Exploitation for Defense Evasion</Item>
                                      <Item key="DE-12" isActive={activeItemIds.includes('DE-12')}>File and Directory Permissions Modification</Item>
                                      <Item key="DE-13" isActive={activeItemIds.includes('DE-13')}>Hide Artifacts</Item>
                                      <Item key="DE-14" isActive={activeItemIds.includes('DE-14')}>Hijack Execution Flow</Item>
                                      <Item key="DE-15" isActive={activeItemIds.includes('DE-15')}>Impair Defenses</Item>
                                      <Item key="DE-16" isActive={activeItemIds.includes('DE-16')}>Indicator Removal</Item>
                                      <Item key="DE-17" isActive={activeItemIds.includes('DE-17')}>Indirect Command Execution</Item>
                                      <Item key="DE-18" isActive={activeItemIds.includes('DE-18')}>Masquerading</Item>
                                      <Item key="DE-19" isActive={activeItemIds.includes('DE-19')}>Modify Authentication Process</Item>
                                      <Item key="DE-20" isActive={activeItemIds.includes('DE-20')}>Modify Cloud Compute Infrastructure</Item>
                                      <Item key="DE-21" isActive={activeItemIds.includes('DE-21')}>Modify Registry</Item>
                                      <Item key="DE-22" isActive={activeItemIds.includes('DE-22')}>Modify System Image</Item>
                                      <Item key="DE-23" isActive={activeItemIds.includes('DE-23')}>Network Boundary Bridging</Item>
                                      <Item key="DE-24" isActive={activeItemIds.includes('DE-24')}>Obfuscated Files or Information</Item>
                                      <Item key="DE-25" isActive={activeItemIds.includes('DE-25')}>Plist File Modification</Item>
                                      <Item key="DE-26" isActive={activeItemIds.includes('DE-26')}>Pre-OS Boot</Item>
                                      <Item key="DE-27" isActive={activeItemIds.includes('DE-27')}>Process Injection</Item>
                                      <Item key="DE-28" isActive={activeItemIds.includes('DE-28')}>Reflective Code Loading</Item>
                                      <Item key="DE-29" isActive={activeItemIds.includes('DE-29')}>Rogue Domain Controller</Item>
                                      <Item key="DE-30" isActive={activeItemIds.includes('DE-30')}>Rootkit</Item>
                                      <Item key="DE-31" isActive={activeItemIds.includes('DE-31')}>Subvert Trust Controls</Item>
                                      <Item key="DE-32" isActive={activeItemIds.includes('DE-32')}>System Binary Proxy Execution</Item>
                                      <Item key="DE-33" isActive={activeItemIds.includes('DE-33')}>System Script Proxy Execution</Item>
                                      <Item key="DE-34" isActive={activeItemIds.includes('DE-34')}>Template Injection</Item>
                                      <Item key="DE-35" isActive={activeItemIds.includes('DE-35')}>Traffic Signaling</Item>
                                      <Item key="DE-36" isActive={activeItemIds.includes('DE-36')}>Trusted Developer Utilities Proxy Execution</Item>
                                      <Item key="DE-37" isActive={activeItemIds.includes('DE-37')}>Unused/ Unsupported Cloud Regions</Item>
                                      <Item key="DE-38" isActive={activeItemIds.includes('DE-38')}>Use Alternate Authentication Material</Item>
                                      <Item key="DE-39" isActive={activeItemIds.includes('DE-39')}>Valid Accounts</Item>
                                      <Item key="DE-40" isActive={activeItemIds.includes('DE-40')}>Virtualization/ Sandbox Evasion</Item>
                                      <Item key="DE-41" isActive={activeItemIds.includes('DE-41')}>Weaken Encryption</Item>
                                      <Item>XSL Script Processing</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="CA-1" isActive={activeItemIds.includes('CA-1')}>Adversary-in-the-Middle</Item>
                                      <Item key="CA-2" isActive={activeItemIds.includes('CA-2')}>Brute Force</Item>
                                      <Item key="CA-3" isActive={activeItemIds.includes('CA-3')}>Credentials from Password Stores</Item>
                                      <Item key="CA-4" isActive={activeItemIds.includes('CA-4')}>Exploitation for Credential Access</Item>
                                      <Item key="CA-5" isActive={activeItemIds.includes('CA-5')}>Forced Authentication</Item>
                                      <Item key="CA-6" isActive={activeItemIds.includes('CA-6')}>Forge Web Credentials</Item>
                                      <Item key="CA-7" isActive={activeItemIds.includes('CA-7')}>Input Capture</Item>
                                      <Item key="CA-8" isActive={activeItemIds.includes('CA-8')}>Modify Authentication Process</Item>
                                      <Item key="CA-9" isActive={activeItemIds.includes('CA-9')}>Multi-Factor Authentication Interception</Item>
                                      <Item key="CA-10" isActive={activeItemIds.includes('CA-10')}>Multi-Factor Authentication Request Generation</Item>
                                      <Item key="CA-11" isActive={activeItemIds.includes('CA-11')}>Network Sniffing</Item>
                                      <Item key="CA-12" isActive={activeItemIds.includes('CA-12')}>OS Credential Dumping</Item>
                                      <Item key="CA-13" isActive={activeItemIds.includes('CA-13')}>Steal Application Access Token</Item>
                                      <Item key="CA-14" isActive={activeItemIds.includes('CA-14')}>Steal Web Session Cookie</Item>
                                      <Item key="CA-15" isActive={activeItemIds.includes('CA-15')}>Steal or Forge Authentication Certificates</Item>
                                      <Item key="CA-16" isActive={activeItemIds.includes('CA-16')}>Steal or Forge Kerberos Tickets</Item>
                                      <Item key="CA-17" isActive={activeItemIds.includes('CA-17')}>Unsecured Credentials</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="DI-1" isActive={activeItemIds.includes('DI-1')}>Account Discovery</Item>
                                      <Item key="DI-2" isActive={activeItemIds.includes('DI-2')}>Application Window Discovery</Item>
                                      <Item key="DI-3" isActive={activeItemIds.includes('DI-3')}>Browser Information Discovery</Item>
                                      <Item key="DI-4" isActive={activeItemIds.includes('DI-4')}>Cloud Infrastructure Discovery</Item>
                                      <Item key="DI-5" isActive={activeItemIds.includes('DI-5')}>Cloud Service Dashboard</Item>
                                      <Item key="DI-6" isActive={activeItemIds.includes('DI-6')}>Cloud Service Discovery</Item>
                                      <Item key="DI-7" isActive={activeItemIds.includes('DI-7')}>Cloud Storage Object Discovery</Item>
                                      <Item key="DI-8" isActive={activeItemIds.includes('DI-8')}>Container and Resource Discovery</Item>
                                      <Item key="DI-9" isActive={activeItemIds.includes('DI-9')}>Debugger Evasion</Item>
                                      <Item key="DI-10" isActive={activeItemIds.includes('DI-10')}>Device Driver Discovery</Item>
                                      <Item key="DI-11" isActive={activeItemIds.includes('DI-11')}>Domain Trust Discovery</Item>
                                      <Item key="DI-12" isActive={activeItemIds.includes('DI-12')}>File and Directory Discovery</Item>
                                      <Item key="DI-13" isActive={activeItemIds.includes('DI-13')}>Group Policy Discovery</Item>
                                      <Item key="DI-14" isActive={activeItemIds.includes('DI-14')}>Network Service Discovery</Item>
                                      <Item key="DI-15" isActive={activeItemIds.includes('DI-15')}>Network Share Discovery</Item>
                                      <Item key="DI-16" isActive={activeItemIds.includes('DI-16')}>Network Sniffing</Item>
                                      <Item key="DI-17" isActive={activeItemIds.includes('DI-17')}>Password Policy Discovery</Item>
                                      <Item key="DI-18" isActive={activeItemIds.includes('DI-18')}>Peripheral Device Discovery</Item>
                                      <Item key="DI-19" isActive={activeItemIds.includes('DI-19')}>Permission Groups Discovery</Item>
                                      <Item key="DI-20" isActive={activeItemIds.includes('DI-20')}>Process Discovery</Item>
                                      <Item key="DI-21" isActive={activeItemIds.includes('DI-21')}>Query Registry</Item>
                                      <Item key="DI-22" isActive={activeItemIds.includes('DI-22')}>Remote System Discovery</Item>
                                      <Item key="DI-23" isActive={activeItemIds.includes('DI-23')}>Software Discovery</Item>
                                      <Item key="DI-24" isActive={activeItemIds.includes('DI-24')}>System Information Discovery</Item>
                                      <Item key="DI-25" isActive={activeItemIds.includes('DI-25')}>System Location Discovery</Item>
                                      <Item key="DI-26" isActive={activeItemIds.includes('DI-26')}>System Network Configuration Discovery</Item>
                                      <Item key="DI-27" isActive={activeItemIds.includes('DI-27')}>System Network Connections Discovery</Item>
                                      <Item key="DI-28" isActive={activeItemIds.includes('DI-28')}>System Owner/ User Discovery</Item>
                                      <Item key="DI-29" isActive={activeItemIds.includes('DI-29')}>System Service Discovery</Item>
                                      <Item key="DI-30" isActive={activeItemIds.includes('DI-30')}>System Time Discovery</Item>
                                      <Item key="DI-31" isActive={activeItemIds.includes('DI-31')}>Virtualization/ Sandbox Evasion</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="LM-1" isActive={activeItemIds.includes('LM-1')}>Exploitation of Remote Services</Item>
                                      <Item key="LM-2" isActive={activeItemIds.includes('LM-2')}>Internal Spearphishing</Item>
                                      <Item key="LM-3" isActive={activeItemIds.includes('LM-3')}>Lateral Tool Transfer</Item>
                                      <Item key="LM-4" isActive={activeItemIds.includes('LM-4')}>Remote Service Session Hijacking</Item>
                                      <Item key="LM-5" isActive={activeItemIds.includes('LM-5')}>Remote Services</Item>
                                      <Item key="LM-6" isActive={activeItemIds.includes('LM-6')}>Replication Through Removable Media</Item>
                                      <Item key="LM-7" isActive={activeItemIds.includes('LM-7')}>Software Deployment Tools</Item>
                                      <Item key="LM-8" isActive={activeItemIds.includes('LM-8')}>Taint Shared Content</Item>
                                      <Item key="LM-9" isActive={activeItemIds.includes('LM-9')}>Use Alternate Authentication Material</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="CO-1" isActive={activeItemIds.includes('CO-1')}>Adversary-in-the-Middle</Item>
                                      <Item key="CO-2" isActive={activeItemIds.includes('CO-2')}>Archive Collected Data</Item>
                                      <Item key="CO-3" isActive={activeItemIds.includes('CO-3')}>Audio Capture</Item>
                                      <Item key="CO-4" isActive={activeItemIds.includes('CO-4')}>Automated Collection</Item>
                                      <Item key="CO-5" isActive={activeItemIds.includes('CO-5')}>Browser Session Hijacking</Item>
                                      <Item key="CO-6" isActive={activeItemIds.includes('CO-6')}>Clipboard Data</Item>
                                      <Item key="CO-7" isActive={activeItemIds.includes('CO-7')}>Data Staged</Item>
                                      <Item key="CO-8" isActive={activeItemIds.includes('CO-8')}>Data from Cloud Storage</Item>
                                      <Item key="CO-9" isActive={activeItemIds.includes('CO-9')}>Data from Configuration Repository</Item>
                                      <Item key="CO-10" isActive={activeItemIds.includes('CO-10')}>Data from Information Repositories</Item>
                                      <Item key="CO-11" isActive={activeItemIds.includes('CO-11')}>Data from Local System</Item>
                                      <Item key="CO-12" isActive={activeItemIds.includes('CO-12')}>Data from Network Shared Drive</Item>
                                      <Item key="CO-13" isActive={activeItemIds.includes('CO-13')}>Data from Removable Media</Item>
                                      <Item key="CO-14" isActive={activeItemIds.includes('CO-14')}>Email Collection</Item>
                                      <Item key="CO-15" isActive={activeItemIds.includes('CO-15')}>Input Capture</Item>
                                      <Item key="CO-16" isActive={activeItemIds.includes('CO-16')}>Screen Capture</Item>
                                      <Item key="CO-17" isActive={activeItemIds.includes('CO-17')}>Video Capture</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="EXF-1" isActive={activeItemIds.includes('EXF-1')}>Application Layer Protocol</Item>
                                      <Item key="EXF-2" isActive={activeItemIds.includes('EXF-2')}>Communication Through Removable Media</Item>
                                      <Item key="EXF-3" isActive={activeItemIds.includes('EXF-3')}>Data Encoding</Item>
                                      <Item key="EXF-4" isActive={activeItemIds.includes('EXF-4')}>Data Obfuscation</Item>
                                      <Item key="EXF-5" isActive={activeItemIds.includes('EXF-5')}>Dynamic Resolution</Item>
                                      <Item key="EXF-6" isActive={activeItemIds.includes('EXF-6')}>Encrypted Channel</Item>
                                      <Item key="EXF-7" isActive={activeItemIds.includes('EXF-7')}>Fallback Channels</Item>
                                      <Item key="EXF-8" isActive={activeItemIds.includes('EXF-8')}>Ingress Tool Transfer</Item>
                                      <Item key="EXF-9" isActive={activeItemIds.includes('EXF-9')}>Multi-Stage Channels</Item>
                                      <Item key="EXF-10" isActive={activeItemIds.includes('EXF-10')}>Non-Application Layer Protocol</Item>
                                      <Item key="EXF-11" isActive={activeItemIds.includes('EXF-11')}>Non-Standard Port</Item>
                                      <Item key="EXF-12" isActive={activeItemIds.includes('EXF-12')}>Protocol Tunneling</Item>
                                      <Item key="EXF-13" isActive={activeItemIds.includes('EXF-13')}>Proxy</Item>
                                      <Item key="EXF-14" isActive={activeItemIds.includes('EXF-14')}>Remote Access Software</Item>
                                      <Item key="EXF-15" isActive={activeItemIds.includes('EXF-15')}>Traffic Signaling</Item>
                                      <Item key="EXF-16" isActive={activeItemIds.includes('EXF-16')}>Web Service</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="C2-1" isActive={activeItemIds.includes('C2-1')}>Automated Exfiltration</Item>
                                      <Item key="C2-2" isActive={activeItemIds.includes('C2-2')}>Data Transfer Size Limits</Item>
                                      <Item key="C2-3" isActive={activeItemIds.includes('C2-3')}>Exfiltration Over Alternative Protocol</Item>
                                      <Item key="C2-4" isActive={activeItemIds.includes('C2-4')}>Exfiltration Over C2 Channel</Item>
                                      <Item key="C2-5" isActive={activeItemIds.includes('C2-5')}>Exfiltration Over Other Network Medium</Item>
                                      <Item key="C2-6" isActive={activeItemIds.includes('C2-6')}>Exfiltration Over Physical Medium</Item>
                                      <Item key="C2-7" isActive={activeItemIds.includes('C2-7')}>Exfiltration Over Web Service</Item>
                                      <Item key="C2-8" isActive={activeItemIds.includes('C2-8')}>Scheduled Transfer</Item>
                                      <Item key="C2-9" isActive={activeItemIds.includes('C2-9')}>Transfer Data to Cloud Account</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1 }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="IM-1" isActive={activeItemIds.includes('IM-1')}>Account Access Removal</Item>
                                      <Item key="IM-2" isActive={activeItemIds.includes('IM-2')}>Data Destruction</Item>
                                      <Item key="IM-3" isActive={activeItemIds.includes('IM-3')}>Data Encrypted for Impact</Item>
                                      <Item key="IM-4" isActive={activeItemIds.includes('IM-4')}>Data Manipulation</Item>
                                      <Item key="IM-5" isActive={activeItemIds.includes('IM-5')}>Defacement</Item>
                                      <Item key="IM-6" isActive={activeItemIds.includes('IM-6')}>Disk Wipe</Item>
                                      <Item key="IM-7" isActive={activeItemIds.includes('IM-7')}>Endpoint Denial of Service</Item>
                                      <Item key="IM-8" isActive={activeItemIds.includes('IM-8')}>Firmware Corruption</Item>
                                      <Item key="IM-9" isActive={activeItemIds.includes('IM-9')}>Inhibit System Recovery</Item>
                                      <Item key="IM-10" isActive={activeItemIds.includes('IM-10')}>Network Denial of Service</Item>
                                      <Item key="IM-11" isActive={activeItemIds.includes('IM-11')}>Resource Hijacking</Item>
                                      <Item key="IM-12" isActive={activeItemIds.includes('IM-12')}>Service Stop</Item>
                                      <Item key="IM-13" isActive={activeItemIds.includes('IM-13')}>System Shutdown/ Reboot</Item>
                                    </Stack>
                                  </Box>
                                </div>
                            </div>
                        </div>
		</div>

		);
}
export default Tools;