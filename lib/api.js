import fs from 'fs'
import path, { join } from 'path'
import matter from 'gray-matter'
import _ from 'lodash'
import moment from 'moment'
import { ALL_CATEGORY } from './constants'

const postsDirectory = join(process.cwd(), '_posts')

function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(fileName => path.extname(fileName) === `.md`)
}

function getPostDataBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return matter(fileContents)
}

export function getAllCategories() {
  const categoryList = []
  const slugs = getPostSlugs()

  if (slugs) {
    if (slugs.length > 0) {
      categoryList.push(`${ALL_CATEGORY}`)
    }

    slugs.map(slug => {
      const { data } = getPostDataBySlug(slug)
      const currentCategory = _.trim(data['category'])
  
      if (categoryList.indexOf(currentCategory) === -1) {
        categoryList.push(currentCategory)
      }
    })
  
    return categoryList
  }
  
  return null
}

export function getAllPosts(fields = []) {
  const posts = []
  getPostSlugs().map(slug => {
    const { data, content } = getPostDataBySlug(slug)
    const items = {}

    fields.forEach(field => {
      if (field === 'content') {
        items[field] = content
      }
  
      if (data[field]) {
        items[field] = data[field]
      }
    })

    posts.push(items)
  })

  return posts.sort((post1, post2) => (moment(post1.date).isAfter(post2.date)))
}

export function getPostsByCategory(category = ALL_CATEGORY) {
  const allPosts = getAllPosts([
    'title',
    'date',
    'category',
  ])

  if (category !== ALL_CATEGORY) {
    return allPosts.filter(currentValue => currentValue.category === category)
  }

  return allPosts
}

export function getPostContentByTitle(postTitle) {
  const postsContent = getAllPosts([
    'title',
    'date',
    'category',
    'content'
  ])
  for (let i = 0, currrentPost = null; i < postsContent.length; i++) {
    currrentPost = postsContent[i]
    if (currrentPost.title === postTitle) {
      return postsContent[i]
    }
  }

  return null
}

export function getPostContentForIndex() {
  const postsContent = getAllPosts([
    'title',
    'date',
    'category',
    'content'
  ])

  if (postsContent && postsContent.length > 0) {
    return postsContent[0]
  }
  
  return null
}