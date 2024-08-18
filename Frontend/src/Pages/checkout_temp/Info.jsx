import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

const products = [
    {
        name: 'Professional plan',
        desc: 'Monthly subscription',
        price: '$15.00',
    },
    {
        name: 'Dedicated support',
        desc: 'Included in the Professional plan',
        price: 'Free',
    },
    {
        name: 'Hardware',
        desc: 'Devices needed for development',
        price: '$69.99',
    },
    {
        name: 'Landing page template',
        desc: 'License',
        price: '$49.99',
    },
];

function Info({ totalPrice, data }) {
    React.useEffect(() => {
        console.log(data)
    }, [])
    return (
        <React.Fragment>
            <Box sx={{ marginBottom: '1rem' }}>
                {data && <img src={data?.accommodation?.photos[0]?.url} alt="" />}
            </Box>
            <Typography variant="subtitle2" color="text.secondary" style={{ fontSize: '2rem', }}>
                <h3>Total</h3>
            </Typography>
            <Typography variant="h4" gutterBottom>
                <span>{totalPrice}</span>
            </Typography>
            <List disablePadding>
                {/* {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            sx={{ mr: 2 }}
                            primary={product.name}
                            secondary={product.desc}
                        />
                        <Typography variant="body1" fontWeight="medium">
                            {product.price}
                        </Typography>
                    </ListItem>
                ))} */}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText
                        sx={{ mr: 2 }}
                        primary={'Name'}
                        secondary={'HotelName'}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.accommodation?.name.length > 15
                                ? `${data.accommodation.name.substring(0, 20)}...`
                                : data?.accommodation?.name}
                        </span>
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText
                        sx={{ mr: 2 }}
                        primary={'Date'}
                        secondary={'CheckInDate'}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.check_in_date}
                        </span>
                    </Typography>

                </ListItem>

                <ListItem sx={{ marginTop: '-1.6rem', px: 0 }}>
                    <ListItemText
                        // primary={'Date'}
                        secondary={'CheckOutDate'}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.check_out_date}
                        </span>
                    </Typography>

                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText
                        sx={{ mr: 2 }}
                        primary={'Passengers'}
                        secondary={'Adults'}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.adults}
                        </span>
                    </Typography>
                </ListItem>



                {/* Address */}
                <ListItem sx={{ py: 1, px: 0, }}>
                    <ListItemText
                        sx={{ mr: 2, fontFamily: 'Quicksand, sans-serif !important' }}
                        primary={'Address'}
                        secondary={'Line_One'}
                        primaryTypographyProps={{ sx: { fontFamily: 'Quicksand, sans-serif !important' } }}
                        secondaryTypographyProps={{ sx: { fontFamily: 'Quicksand, sans-serif !important' } }}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.accommodation?.location?.address?.line_one}
                        </span>
                    </Typography>

                </ListItem>

                <ListItem sx={{ marginTop: '-1.3rem', px: 0, py: 1, }}>
                    <ListItemText
                        // primary={''}
                        secondary={'cityName'}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.accommodation?.location?.address?.city_name}
                        </span>
                    </Typography>

                </ListItem>
                <ListItem sx={{ marginTop: '-1.3rem', px: 0, py: 1 }}>
                    <ListItemText
                        // primary={'Date'}
                        secondary={'PostolCode'}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.accommodation?.location?.address?.postal_code}
                        </span>
                    </Typography>

                </ListItem>
                <ListItem sx={{ marginTop: '-1.3rem', px: 0, py: 1 }}>
                    <ListItemText
                        // primary={'Date'}
                        secondary={'CountryCode'}
                    />
                    <Typography variant="body1" fontWeight="medium">
                        <span>
                            {data?.accommodation?.location?.address?.country_code}
                        </span>
                    </Typography>

                </ListItem>
                <ListItem sx={{ marginTop: '-1.3rem', px: 0, py: 1 }}>
                    <ListItemText
                        // primary={'Date'}
                        secondary={'Region'}
                    />
                    <Typography variant="body1" fontWeight="medium" >
                        <span>
                            {data?.accommodation?.location?.address?.region || 'Null'}
                        </span>
                    </Typography>

                </ListItem>
            </List>
        </React.Fragment>
    );
}

Info.propTypes = {
    totalPrice: PropTypes.string.isRequired,
};

export default Info;