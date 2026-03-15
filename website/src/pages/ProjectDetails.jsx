import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const ProjectDetails = () => {
  useEffect(() => {
    document.body.className = 'project-details-page';
    
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <Header />
      
      <PageHero
        title="Project Details"
        subtitle="In-depth look at our featured photography projects"
        backgroundImage="/assets/img/HomePage/Turning-Real-Emotions-into-Everlasting-Art-Photo.jpg"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Portfolio', to: '/portfolio' },
          { label: 'Project Details' }
        ]}
      />

      <main className="main">
        <section className="section mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Project Details</h1>
                <p>Detailed project information will be displayed here.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetails;