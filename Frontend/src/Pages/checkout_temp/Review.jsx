import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type:', detail: 'Visa' },
    { name: 'Card holder:', detail: 'Mr. John Smith' },
    { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date:', detail: '04/2024' },
];

export default function Review({
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,

    name,
    cardNumber,
    cvv,
    expiration,
    price

}) {
    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {price}
                    </Typography>
                </ListItem>
            </List>
            <Divider />
            <Stack
                direction="column"
                divider={<Divider flexItem />}
                spacing={2}
                sx={{ my: 2 }}
            >
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        UserDetails
                    </Typography>
                    <Typography gutterBottom>{firstName + lastName}</Typography>
                    <Typography gutterBottom>{country + ' ' + city + ' ' + (zip || '') + ' ' + (state || '') + ' ' + (addressLine1 || '') + ' ' + (addressLine2 || '')}</Typography>
                    {/* <Typography gutterBottom>{city}</Typography>
                    <Typography gutterBottom>{zip}</Typography>
                    <Typography gutterBottom>{state}</Typography>
                    <Typography gutterBottom>{addressLine1}</Typography>
                    <Typography gutterBottom>{addressLine2}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {addresses.join(', ')}
                    </Typography> */}
                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {/* {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        {name}
                                    </Typography>
                                    <Typography variant="body2">{payment.detail}</Typography>
                                </Stack>
                            </React.Fragment>
                        ))} */}
                        <React.Fragment key={name}>
                            <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                sx={{ width: '100%', mb: 1 }}
                            >
                                <Typography variant="body1" color="text.secondary">
                                    Card Type
                                </Typography>
                                <Typography variant="body2">Visa</Typography>
                            </Stack>
                        </React.Fragment>
                        <React.Fragment key={name}>
                            <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                sx={{ width: '100%', mb: 1 }}
                            >
                                <Typography variant="body1" color="text.secondary">
                                    Card Number
                                </Typography>
                                <Typography variant="body2">{cardNumber}</Typography>
                            </Stack>
                        </React.Fragment>  <React.Fragment key={name}>
                            <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                sx={{ width: '100%', mb: 1 }}
                            >
                                <Typography variant="body1" color="text.secondary">
                                    Name
                                </Typography>
                                <Typography variant="body2">{name}</Typography>
                            </Stack>
                        </React.Fragment>  <React.Fragment key={name}>
                            <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                sx={{ width: '100%', mb: 1 }}
                            >
                                <Typography variant="body1" color="text.secondary">
                                    Expiration Date
                                </Typography>
                                <Typography variant="body2">{expiration}</Typography>
                            </Stack>
                        </React.Fragment>
                    </Grid>
                </div>
            </Stack>
        </Stack>
    );
}