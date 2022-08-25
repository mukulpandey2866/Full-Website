import { Container, Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import blogService from '../../api/blogService'
import { IBlog } from '../../interfaces/blog.interface'
import BlogCard from './BlogCard'
import NewPost from './NewPost'

const Blog = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([])

  useEffect(() => {
    blogService.getAll().then((response) => setBlogs(response))
  }, [])
  return (
    <Container
      sx={{
        mt: 10,
        p: 5
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} alignSelf="center" mb={4} height="100%">
          <NewPost setBlogs={setBlogs} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          px={3}
          sx={{ height: '80vh', overflowY: 'auto' }}
        >
          <Box>
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} setBlogs={setBlogs} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Blog
