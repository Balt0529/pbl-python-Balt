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
    const[newTemp_lo,setNewTemp_lo]=useState<number|string>("");
    const[newTemp_hi,setNewTemp_hi]=useState<number|string>("");
    const[newPlace,setNewPlace]=useState<string>("");

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
        setNewTemp_lo("");
        setNewTemp_hi("");
        setNewPlace("");
        
        SaunaPage();
      }catch(err){
        console.error(err);
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
                <FormLabel mt={2}>Temp_lo</FormLabel>
                <Input 
                    value={newTemp_lo}
                    onChange={(e) => setNewTemp_lo(e.target.value)}
                    placeholder="新しいTemp_loを入力"
                />
                <FormLabel mt={2}>Temp_hi</FormLabel>
                <Input 
                    value={newTemp_hi}
                    onChange={(e) => setNewTemp_hi(e.target.value)}
                    placeholder="新しいTemp_hiを入力"
                />
                <FormLabel mt={2}>Place</FormLabel>
                <Input 
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    placeholder="新しいPlaceを入力"
                />
                <Button mt={2} onClick={addSauna}>アイテム追加</Button> {/* アイテムを追加するボタン */}
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>  
      </>  
    )
}