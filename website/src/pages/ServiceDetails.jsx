import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const ServiceDetails = () => {
  useEffect(() => {
    document.body.className = 'service-details-page';
    
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <Header />
      
      <PageHero
        title="Service Details"
        subtitle="Detailed information about our photography services"
        backgroundImage="/assets/img/HomePage/7.webp"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Service Details' }
        ]}
      />

      <main className="main">
        <section className="section mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Service Details</h1>
                <p>Detailed service information will be displayed here.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServiceDetails;