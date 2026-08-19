import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import properties from '../data/properties'
import '../styles/FeaturedProperties.css'

const TABS = ['All', 'For Sale', 'For Rent', 'Apartment', 'Villa', 'House']

function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState('All')

  const featured = useMemo(() => {
    let list = properties
    if (activeTab === 'For Sale' || activeTab === 'For Rent') {
      list = list.filter(p => p.status === activeTab)
    } else if (activeTab !== 'All') {
      list = list.filter(p => p.type === activeTab)
    }
    return list.slice(0, 6)
  }, [activeTab])

  return (
    <section className="featured-section" aria-label="Featured Properties">

      <div className="featured-section__header">
        <div className="featured-section__header-left">
          <p className="featured-section__eyebrow">Hand-picked for you</p>
          <h2 className="featured-section__title">Featured Properties</h2>
          <p className="featured-section__subtitle">
            Explore our curated selection of premium listings — updated daily.
          </p>
        </div>
        <Link to="/properties" className="featured-section__see-all">
          View all listings
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <div className="featured-section__tabs" role="tablist" aria-label="Filter properties">
        {TABS.map(tab => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`featured-section__tab ${activeTab === tab ? 'featured-section__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {featured.length > 0 ? (
        <div className="featured-section__grid">
          {featured.map((property, index) => (
            <div
              key={property.id}
              className="featured-section__card-wrap"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <PropertyCard property={property} featured={true} view="grid" />
            </div>
          ))}
        </div>
      ) : (
        <div className="featured-section__empty">
          <p>No properties match this filter.</p>
          <button onClick={() => setActiveTab('All')} className="featured-section__reset">
            Show all
          </button>
        </div>
      )}

      <div className="featured-section__footer">
        <p className="featured-section__footer-text">
          Showing {featured.length} of {properties.length} properties
        </p>
        <Link to="/properties" className="featured-section__load-more">
          Explore All Properties →
        </Link>
      </div>

    </section>
  )
}

export default FeaturedProperties
