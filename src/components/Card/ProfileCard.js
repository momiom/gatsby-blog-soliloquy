import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import tw, { css } from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import Card from './Card'

const SnsField = ({ data, styles }) => {
  const snsIcons = []
  data.map(v => {
    const { link, service_name } = v
    switch (service_name[0]) {
      case 'Twitter':
        snsIcons.push(
          <li key={link}>
            <a
              href={link}
              tw="p-2.5 text-lg text-light-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>,
        )
        break
      case 'Instagram':
        snsIcons.push(
          <li key={link}>
            <a
              href={link}
              tw="p-2.5 text-lg text-light-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>,
        )
        break
      case 'Mail':
        snsIcons.push(
          <li key={link}>
            <a
              href={`mailto:${link}?subject=お問い合わせ内容を簡単にご記入ください&amp;body=お問い合わせありがとうございます。お問い合わせ内容の詳細をご記入ください。`}
              tw="p-2.5 text-lg text-light-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </li>,
        )
        break
      default:
        break
    }
  })
  return (
    <ul tw="list-none flex" css={styles}>
      {snsIcons}
    </ul>
  )
}

const ProfileCard = ({ data }) => {
  const { name, description, localImage, sns } = data
  return (
    <Card styles={tw`p-3.5 flex flex-col items-center`}>
      <figure>
        <GatsbyImage
          image={getImage(localImage)}
          alt={name}
          tw="w-24 h-24 rounded-full object-cover object-center"
        />
      </figure>
      <h2 tw="pt-2.5 text-light-black text-2xl font-bold tracking-wider">
        {name}
      </h2>
      <SnsField data={sns} styles={tw`pt-2.5`} />
      <div
        tw="pt-2.5 px-6 text-light-black text-sm tracking-wide"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </Card>
  )
}
ProfileCard.propTypes = {
  data: PropTypes.object,
}

export default ProfileCard
