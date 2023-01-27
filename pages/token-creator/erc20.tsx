import {Checkbox, CheckboxGroup, Input, InputGroup, InputLeftAddon, Stack, Text} from '@chakra-ui/react'

const Erc20 = () => {

    return (
        <Stack>
            <Text as={'b'}>Settings</Text>
            <Stack
                direction={'row'}
            >
                <InputGroup>
                    <InputLeftAddon>
                        <p>Token Name</p>
                    </InputLeftAddon>
                    <Input placeholder=''/>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon>
                        <p>Token Symbol</p>
                    </InputLeftAddon>
                    <Input placeholder=''/>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon>
                        <p>Decimal</p>
                    </InputLeftAddon>
                    <Input
                        type={'number'}
                        placeholder=''
                        defaultValue={18}
                    />
                </InputGroup>
            </Stack>
            <p/>
            <Text as={'b'}>Features</Text>
            <Stack
                direction={'row'}
            >
                <CheckboxGroup colorScheme='green'>
                    <Stack spacing={[1, 5]} direction={['row']}>
                        <Checkbox value='Mintable'>Mintable</Checkbox>
                        <Checkbox value='Burnable'>Burnable</Checkbox>
                        <Checkbox value='Pausable'>Pausable</Checkbox>
                    </Stack>
                </CheckboxGroup>
            </Stack>
            <Text as={'b'}>Access Control</Text>
            <Stack
                direction={'row'}
            >
                <CheckboxGroup colorScheme='green'>
                    <Stack spacing={[1, 5]} direction={['row']}>
                        <Checkbox value='Mintable'>Mintable</Checkbox>
                        <Checkbox value='Burnable'>Burnable</Checkbox>
                        <Checkbox value='Pausable'>Pausable</Checkbox>
                    </Stack>
                </CheckboxGroup>
            </Stack>
        </Stack>

    )
}

export default Erc20
