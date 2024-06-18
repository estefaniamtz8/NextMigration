import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@mui/material'

// import JobAndPostulations from 'components/common/Job/JobAndPostulations'
import Job from "components/common/Job";

const JobAndPostulationsLazy = React.lazy(() => import('components/common/Job/JobAndPostulations'))

const ModalVacancy = ({ open, onOpenChange, job, company, isJobXPostulations }) => (
  <Drawer
    open={open}
    onClose={() => onOpenChange(false)}
    anchor="right"
    PaperProps={{
      sx: { width: isJobXPostulations ? '40vw' : '30vw' }
    }}
    hideBackdrop={!isJobXPostulations}
  >
    {
      isJobXPostulations ? (
        <JobAndPostulationsLazy
          job={{
            companyName: company.companyName,
            logo: company.logo,
            ...job,
            companyID: company?.companyID
          }}
          onClose={() => onOpenChange(false)}
          showClose
          open
        />
      ) : (
        <Job
          job={{
            companyName: company.companyName,
            logo: company.logo,
            ...job
          }}
          onClose={() => onOpenChange(false)}
          showClose
        />
      )
    }
  </Drawer>
)

ModalVacancy.defaultProps = {
  open: false,
  isJobXPostulations: false
}

ModalVacancy.propTypes = {
  open: PropTypes.bool,
  isJobXPostulations: PropTypes.bool,
  onOpenChange: PropTypes.func.isRequired,
  company: PropTypes.shape().isRequired,
  job: PropTypes.shape().isRequired,
}

export default ModalVacancy
