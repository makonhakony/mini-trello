import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import { Button } from 'react-bootstrap';
import Styled from 'styled-components';

const dashboards = [
    { id: 1, name: 'Dashboard 1' },
    { id: 2, name: 'Dashboard 2' },
    // Add more dashboards
  ];
const Dashboard = () => {
    return (
        <div>
            <TopNavBar />
            <Wrapper>
                <Button variant="primary">Create New Dashboard</Button>
                <div className="container mt-4">
                    <div className="row">
                    {dashboards.map((dashboard) => (
                        <div key={dashboard.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href={`/dashboardInfo/${dashboard.id}`}>
                                        {dashboard.name}
                                    </a>
                                </h5>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </Wrapper>
            
        </div>
      );
};

const Wrapper = Styled.section`
    Button {
        margin:0 0 0 50px;
    }
  .container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: Arial;
    
}`;

export default Dashboard;
