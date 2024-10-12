import { Button, ButtonGroup, Text } from '@chakra-ui/react'
import axios from "axios";
import {useState, useEffect} from "react";
import {
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";


export default function Hello(){
    const[sauna,setSauna]=useState<sauna[]>([]);
    const[newName,setNewName]=useState<string>("");
    const[newTemp_lo,setNewTemp_lo]=useState<number>();
    const[newTemp_hi,setNewTemp_hi]=useState<number>();
    const[newPlace,setNewPlace]=useState<string>("");
    
    //GET
    async function SaunaPage() {
        try {
          const url = "http://127.0.0.1:8000/sauna";
          const res = await axios.get(url);
          setSauna(res.data);
        } catch (err) {
            console.error(err);
        }
      }
    
    //POST  
    async function addSauna(){
      try{
        const url = "http://127.0.0.1:8000/sauna";
        const newSauna={name:newName,temp_lo:newTemp_lo,temp_hi:newTemp_hi,place:newPlace};
        await axios.post(url,newSauna);
        setNewName("");
        setNewTemp_lo(undefined);
        setNewTemp_hi(undefined);
        setNewPlace("");
        SaunaPage();
      }catch(err){
        console.error(err);
      }
    }

    //delete
    async function deleteSauna(name: string){
      try{
        const url="http://127.0.0.1:8000/sauna/${sauna_name}";
        await axios.delete(url);
        SaunaPage();
      }catch(err){
        console.error("Error deleting sauna:",err);
      }
    }
    
    useEffect(()=>{SaunaPage()},[]);
      
    return (
      <>
      <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="新しいNameを入力"
                />
                <FormLabel mt={2}>Temp_hi</FormLabel>
                <Input 
                    value={newTemp_hi !==undefined ? newTemp_hi : ""} //undefinedのときに空白を表示
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value===""){
                        setNewTemp_hi(undefined); //空白の場合、undefinedに設定
                      }else{
                        const parsedValue=parseInt(value,10);
                        if(!isNaN(parsedValue)){
                          setNewTemp_hi(parsedValue);
                        }
                      }
                    }}
                    placeholder="新しいTemp_hiを入力"
                />
                <FormLabel mt={2}>Temp_lo</FormLabel>
                <Input 
                    value={newTemp_lo !==undefined?newTemp_lo:""} //undefinedのときに空白を表示
                    onChange={(e) => {
                      const value=e.target.value;
                      if (value===""){
                        setNewTemp_lo(undefined); //空白の場合、undefinedに設定
                      }else{
                        const parsedValue=parseInt(value,10);
                        if(!isNaN(parsedValue)){
                          setNewTemp_lo(parsedValue);
                        }
                      }
                    }}
                    placeholder="新しいTemp_loを入力"
                />
                <FormLabel mt={2}>Place</FormLabel>
                <Input 
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    placeholder="新しいPlaceを入力"
                />
                <Button mt={2} onClick={addSauna}>Add item</Button> {/* アイテムを追加するボタン */}
      </FormControl>

      <TableContainer>
        <Table variant="striped" colorScheme="yellow" mt={4}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Temp_hi</Th>
              <Th>Temp_lo</Th>
              <Th>Place</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sauna.map((res) => (
              <Tr key={res.name}>
                <Td>{res.name}</Td>
                <Td>{res.temp_hi}</Td>
                <Td>{res.temp_lo}</Td>
                <Td>{res.place}</Td>
                <Td>
                <Button colorScheme="red" onClick={() => deleteSauna(res.name)}>Delete</Button> {/* アイテム削除ボタン*/}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>  
      </>  
    )
}