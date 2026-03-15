import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const Privacy = () => {
  useEffect(() => {
    document.body.className = 'privacy-page';
    
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <Header />
      
      <PageHero
        title="Privacy Policy"
        subtitle="Learn how we collect, protect, and use your information"
        backgroundImage="/assets/img/slider/webbg.webp"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Privacy Policy' }
        ]}
      />

      <main className="main">
        <section className="section mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Privacy Policy</h1>
                <p>Privacy policy content will be shown here.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Privacy;