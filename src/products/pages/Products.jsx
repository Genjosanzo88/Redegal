import { useAxios } from "../hooks";
import { Link } from 'react-router-dom';

import './Products.css';

export const Products = () => {
    const { response, loading, error } = useAxios({
        method: 'GET',
        url: '/api/characters',
    });

    return (
        <div className='App'>
            <h1>Characters</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {error && (
                        <div>
                            <p>{error.message}</p>
                        </div>
                    )}
                     
                      { response.map((response, index) => 
                        <Link key={index} to="#" className="my-card">
                          <img src={ response.image ? response.image  : 'src/assets/Noi.jpg'} className="img img-responsive" alt={response.name}/>
                          <div className="profile-name">{response.name}</div>
                          {/* <div className="profile-position">{alter_ego}</div>
                          <div className="profile-overview">
                              <div className="profile-overview">
                                  <div className="row">
                                      <div className="col-ms-4">
                                          <h3>{publisher}</h3>
                                          <p>Primera aparición: <br />{first_appearance}</p>
                                          {
                                              (alter_ego !== characters)
                                              && <p>{characters}</p>
                                          }
                                      </div>
                                  </div>
                              </div>
                          </div> */}
                      </Link>
                      
                      ) }
                   
                    
                </div>
            )}
        </div>
    );
};