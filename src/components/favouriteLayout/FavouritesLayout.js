import React from 'react'
import { Grid, Container, Segment, GridColumn } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import '../../styles/Layout/_favourites_layout.scss'

function FavouritesLayout() {
    return (
        <Container fluid padded className="favourites-container container">
            <Grid>
        
                <GridColumn width="16">

                    <h4 className="myfavourites-title">My Favourites</h4>
                   <Grid>
                       <GridColumn width="8">
                            <Segment>
                                <Grid>
                                    <GridColumn width="4">
                                        <img src="http://localhost:3001/images/Casual%20Flat%20Loafers%202.png" alt="favourite-img" className="favourite-image"></img>
                                    </GridColumn>
                                    <GridColumn width="12">
                                        <p className="favourite-title">Casual flat loafers</p>
                                        <p className="favourite-size">Size - EU: 36 US: 5.5</p>
                                        <p className="favourite-amount">₦ 10,000</p>
                                    </GridColumn>
                                </Grid>
                                <Grid>
                                    <GridColumn width="10">
                                        <button className="favourite-buynow">BUY NOW</button>
                                    </GridColumn>
                                    <GridColumn width="6">
                                        <button className="favourite-remove"><i class="fas fa-times-circle favourite-times-remove"></i> REMOVE</button>
                                    </GridColumn>
                                </Grid>
                            </Segment>
                       </GridColumn>
                       <GridColumn width="8">
                           <Segment>
                           <Grid>
                                    <GridColumn width="4">
                                        <img src="http://localhost:3001/images/gustavo-spindula-l7wrlsKDmCE-unsplash%202.png" alt="favourite-img" className="favourite-image"></img>
                                    </GridColumn>
                                    <GridColumn width="12">
                                        <p className="favourite-title">Multicolored armless top</p>
                                        <p className="favourite-size">Size - XS</p>
                                        <p className="favourite-amount">₦ 10,000</p>
                                    </GridColumn>
                                </Grid>
                                <Grid>
                                    <GridColumn width="10">
                                        <button className="favourite-buynow">BUY NOW</button>
                                    </GridColumn>
                                    <GridColumn width="6">
                                        <button className="favourite-remove"><i class="fas fa-times-circle favourite-times-remove"></i> REMOVE</button>
                                    </GridColumn>
                                </Grid>
                           </Segment>
                       </GridColumn>
                   </Grid>
                    
                </GridColumn>
            </Grid>
         </Container>
    )
}

export default FavouritesLayout