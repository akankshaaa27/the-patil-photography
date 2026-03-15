import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const Terms = () => {
  useEffect(() => {
    document.body.className = 'terms-page';
    
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <Header />
      
      <PageHero
        title="Terms of Service"
        subtitle="Terms and conditions for using our services"
        backgroundImage="/assets/img/slider/4.jpg"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Terms of Service' }
        ]}
      />

      <main className="main">
        <section className="section mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Terms of Service</h1>
                <p>Terms of service content will be displayed here.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Terms;