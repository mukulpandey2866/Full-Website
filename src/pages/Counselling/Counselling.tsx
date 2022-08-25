import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { FormDialog } from '../../components/Dialog/Dialog'
import { FormIconButton, PrimaryButton } from '../../components/Buttons/Buttons'
import { counsellings } from './counselling-types'
import { FormTextField } from '../../components/TextFields/TextField'
import { useSnackbarContext } from '../../components/Snackbar/context'
import eventService from '../../api/eventService'
import UserContext from '../../context/UserContext'

const Counselling = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [appointmentDate, setAppointmentDate] = useState<string>('')

  const {
    ToastService: { showToast },
  } = useSnackbarContext()
  const { user } = useContext(UserContext)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <FormDialog
        sx={{ minHeight: '25vh' }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography
            variant="h3"
            component="p"
            textAlign="center"
            sx={{ width: '100%' }}
          >
            Schedule a session
          </Typography>
          <FormIconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
          >
            <Close fontSize="medium" sx={{ color: '#7C7C7C' }} />
          </FormIconButton>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <FormTextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              value={appointmentDate}
              onChange={(event) => setAppointmentDate(event.target.value)}
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: '50px' }}
            >
              <PrimaryButton
                sx={{ background: '#EEEEEE' }}
                onClick={() => {
                  eventService.createEvent(
                    '63045980fd59ca63358f2ae2',
                    user._id,
                    appointmentDate,
                    '2'
                  )
                  showToast(
                    true,
                    'success',
                    'Appointment booked successfully !!',
                    'center'
                  )
                  setOpenDialog(false)
                }}
              >
                Submit
              </PrimaryButton>
            </Stack>
          </Stack>
        </DialogContent>
      </FormDialog>
      <Box
        sx={{
          minHeight: '100vh',
          pt: 15,
          pb: 5,
        }}
      >
        <Container>
          <Typography sx={{ py: 5 }} variant="h2" component="h2" align="center">
            Choose Your Counselling
          </Typography>
          <Grid container spacing={4} mb={6} justifyContent="center">
            {counsellings.map((item, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    padding: 0,
                    borderRadius: '10px',
                    maxWidth: 300,
                    minHeight: 400,
                    margin: 'auto',
                    background: '#EEEEEE',
                    boxShadow:
                      '-12px -12px 24px #FFFFFF, 12px 12px 24px rgba(142, 209, 252, 0.25)',
                    '&:hover': {
                      boxShadow:
                        '-12px -12px 24px #FFFFFF, 24px 24px 48px rgba(142, 209, 252, 0.6)',
                    },
                  }}
                >
                  <CardActionArea onClick={() => setOpenDialog(true)}>
                    <CardMedia
                      sx={{
                        width: '100%',
                        height: 300,
                        backgroundPosition: 'center',
                        mb: 2,
                      }}
                      image={item.image}
                      component="img"
                    />
                    <CardContent>
                      <Typography
                        fontWeight="700"
                        variant="button"
                        component="h5"
                        align="center"
                        gutterBottom
                        px={2}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight="500"
                        align="center"
                        color="#7C7C7C"
                        paragraph
                        px={2}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Counselling
