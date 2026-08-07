CREATE DATABASE veterinaria_go_prod;

-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
-- GRANT ALL ON SCHEMA public TO postgres;
-- GRANT ALL ON SCHEMA public TO public;

CREATE TABLE persons( -- Tabla personas
	id UUID DEFAULT gen_random_uuid(),
	-- datos de la personas
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(100)NOT NULL,
	phone_number VARCHAR(20) NOT NULL,

	-- Restricciones de validacion (CONSTRAINT)
	CONSTRAINT pk_persons PRIMARY KEY (id),
	-- Asegura que el email se unico
	CONSTRAINT uq_person_email UNIQUE (email),
	-- Asegura la estructura del email
	CONSTRAINT chk_person_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
	-- Asegura la estructura del telefono
	CONSTRAINT chk_phone CHECK (phone_number  ~* '^[+]?[0-9]{9,12}$'),
	-- Asegura que los nombres no sean vacios
	CONSTRAINT chk_full_name_not_empty CHECK (TRIM(full_name) <> '')
);

CREATE TABLE species ( -- Tabla de las especies
	id INT GENERATED ALWAYS AS IDENTITY, 
	common_name VARCHAR(100) NOT NULL,

	-- Restricciones de validacion (CONSTRAINT)
	CONSTRAINT pk_species PRIMARY KEY (id), --PK especies
	-- Asegura que el nombre de la especie sea unico
	CONSTRAINT uq_specie_name UNIQUE (common_name)
);

CREATE TABLE breeds( -- Tabla de razas
	id INT GENERATED ALWAYS AS IDENTITY,
	common_name VARCHAR(100) NOT NULL,
	species_id INT NOT NULL, -- FK de las especies
	
	-- Restricciones de validacion (CONSTRAINT)
	CONSTRAINT pk_breed PRIMARY KEY (id), -- pk de razas
	CONSTRAINT uq_breed_name_species_id UNIQUE (common_name, species_id),
	
	CONSTRAINT fk_breed_specie
		FOREIGN KEY (species_id) 
		REFERENCES species (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

-- ENUM para restringir el espacio del estado
CREATE TYPE pet_gender AS ENUM ('M', 'F');

CREATE TABLE pet_patients(
	id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100) NOT NULL,
	date_birth DATE NOT NULL,
	gender pet_gender NOT NULL,
	color VARCHAR(50) NOT NULL,
	is_neutered BOOLEAN DEFAULT FALSE,
	is_deceased BOOLEAN DEFAULT FALSE,
	breed_id INT NOT NULL, -- FK DE RAZA
	owner_id UUID NOT NULL, -- FK de persona

	CONSTRAINT pk_pet_patients PRIMARY KEY (id),
	
	CONSTRAINT fk_pet_breed
		FOREIGN KEY (breed_id) 
		REFERENCES breeds (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT fk_pet_owner
		FOREIGN KEY (owner_id) 
		REFERENCES persons (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT chk_date_birth CHECK (date_birth <= CURRENT_DATE)
);

CREATE TABLE specialties( -- Tabla de especialidades del veterinario
	id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR (50)NOT NULL,

	CONSTRAINT uq_specialties_name UNIQUE (name),
	CONSTRAINT pk_specialty PRIMARY KEY (id)
);

CREATE TABLE veterinarians( -- Tabla de veterinario
	id INT GENERATED ALWAYS AS IDENTITY,
	person_id UUID NOT NULL, --FK Persona

	CONSTRAINT uq_veterinarian_person UNIQUE (person_id),
	CONSTRAINT pk_veterinarian PRIMARY KEY (id),
	
	CONSTRAINT fk_veterinarians_person
		FOREIGN KEY (person_id) 
		REFERENCES persons (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);


CREATE TABLE veterinarians_specialties ( -- Tabla Intermedia paciete alergia
	veterinarian_id INT,
	specialty_id INT,

	CONSTRAINT pk_veterinarians_specialties -- PK compuesta
		PRIMARY KEY (veterinarian_id, specialty_id),

	CONSTRAINT fk_veterinarians_specialties_specialtie
		FOREIGN KEY (veterinarian_id) 
		REFERENCES veterinarians (id)
		ON DELETE RESTRICT,
		
	CONSTRAINT fk_veterinarians_specialties_specialty
		FOREIGN KEY (specialty_id) 
		REFERENCES specialties (id)
		ON DELETE RESTRICT
);

CREATE TYPE appointment_type_enum AS ENUM ('Programada', 'Emergencia');
CREATE TYPE appointment_status_enum AS ENUM ('Agendada', 'Cancelado', 'Ausente', 'Completa', 'En Curso');

CREATE TABLE appointments( -- Tabla de Cita 
	id INT GENERATED ALWAYS AS IDENTITY,
	
	scheduled_at TIMESTAMP NOT NULL,
	ended_at  TIMESTAMP,
	reason VARCHAR(150),
	accompanying_id UUID NOT NULL, -- FK persona
	veterinarian_id INT NOT NULL, -- FK veterinario
	pet_patient_id INT NOT NULL, -- Fk del paciente PETIENT
	appointment_type appointment_type_enum NOT NULL, --tipo de cita
	appointment_status appointment_status_enum NOT NULL, -- estado de cita
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- REGISTRO DE AUDITORIA

    CONSTRAINT chk_ended_at CHECK  (ended_at IS NULL OR ended_at > scheduled_at), -- debe ser mayor a la fecha created_at
	CONSTRAINT pk_appointment PRIMARY KEY (id),
	
	CONSTRAINT fk_appointment_person
		FOREIGN KEY (accompanying_id) 
		REFERENCES persons (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,
	
	CONSTRAINT fk_appointment_veterinarian
		FOREIGN KEY (veterinarian_id) 
		REFERENCES veterinarians (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT fk_appointment_pet_patients
		FOREIGN KEY (pet_patient_id) 
		REFERENCES pet_patients (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE vaccines( -- Tabla de tipo de vacuna
	id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR (50)NOT NULL,
	description VARCHAR(255),

	CONSTRAINT uq_vaccine_name UNIQUE (name),
	CONSTRAINT pk_vaccine PRIMARY KEY (id)
);

CREATE TABLE medicines( -- Tabla de tipo de medicamentos
	id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR (50) NOT NULL,
	description VARCHAR(255),

	CONSTRAINT uq_medicine_name UNIQUE (name),
	CONSTRAINT pk_medicine PRIMARY KEY (id)
);

CREATE TABLE allergens( -- Tabla de tipo de alergenos
	id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR (50) NOT NULL,
	description VARCHAR(255),

	CONSTRAINT uq_allergen_name UNIQUE (name),
	CONSTRAINT pk_allergen PRIMARY KEY (id)
);

CREATE TABLE medicine_allergens (
	medicine_id INT,
	allergen_id INT,

	CONSTRAINT pk_medicine_allergens -- PK compuesta
		PRIMARY KEY (medicine_id, allergen_id),

	CONSTRAINT fk_medicine_allergens_medicine
		FOREIGN KEY (medicine_id) 
		REFERENCES medicines (id)
		ON DELETE RESTRICT,
		
	CONSTRAINT fk_medicine_allergens_allergens
		FOREIGN KEY (allergen_id) 
		REFERENCES allergens(id)
		ON DELETE RESTRICT	
	
);

CREATE TABLE patient_allergies ( -- Tabla Intermedia paciete alergia
	patient_id INT,
	allergen_id INT,

	CONSTRAINT pk_patient_allergy -- PK compuesta
		PRIMARY KEY (patient_id, allergen_id),

	CONSTRAINT fk_patient_allergy_patient
		FOREIGN KEY (patient_id) 
		REFERENCES pet_patients (id)
		ON DELETE RESTRICT,
		
	CONSTRAINT fk_patient_allergy_allergen
		FOREIGN KEY (allergen_id) 
		REFERENCES allergens(id)
		ON DELETE RESTRICT	
);

CREATE TABLE vaccine_species ( -- tabla intermedia vacuna especies
	vaccine_id INT,
	species_id INT,
	
	CONSTRAINT pk_vaccine_specie -- PK compuesta
		PRIMARY KEY (vaccine_id, species_id),

	CONSTRAINT fk_vaccine_specie_vaccine
		FOREIGN KEY (vaccine_id) 
		REFERENCES vaccines(id)
		ON DELETE RESTRICT,
		
	CONSTRAINT fk_vaccine_specie_species
		FOREIGN KEY (species_id) 
		REFERENCES species (id)
		ON DELETE RESTRICT
);

CREATE TABLE medical_history( -- Tabla de historial medico
	id INT GENERATED ALWAYS AS IDENTITY,
	date_appointment TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro

	--Informacion de la antencion
	attention_description VARCHAR(200),
	
	-- Triaje
	weight REAL NOT NULL,
	temperature REAL NOT NULL,
	preassure VARCHAR (10),
	
	appointment_id INT,
	
	CONSTRAINT uq_medical_history_appointment UNIQUE (appointment_id),

	CONSTRAINT pk_medical_history -- PK del historial medico
	PRIMARY KEY (id),

	CONSTRAINT fk_medical_history_appointment
		FOREIGN KEY (appointment_id) 
		REFERENCES appointments(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE vaccination_records( -- Tabla de historial de vacuna
	id INT GENERATED ALWAYS AS IDENTITY,
	date_record TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro

	--Informacion de la antencion
	attention_description VARCHAR(200),
	
	appointment_id INT,

	CONSTRAINT uq_vaccination_records_appointment UNIQUE (appointment_id),
	
	CONSTRAINT pk_vaccination_records -- PK del historial de vacuna
	PRIMARY KEY (id),

	CONSTRAINT fk_vaccination_records_appointment
		FOREIGN KEY (appointment_id) 
		REFERENCES appointments(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE prescriptions( -- TABLA DE RECETA MEDICA
	id INT GENERATED ALWAYS AS IDENTITY,
	date_record TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

	--Informacion de la antencion
	attention_description VARCHAR(200),
	
	medical_history_id INT,

	CONSTRAINT uq_prescriptions_medical_history UNIQUE (medical_history_id),
	
	CONSTRAINT pk_prescriptions PRIMARY KEY (id),-- PK del TABLA DE RECETA MEDICA
	
	CONSTRAINT fk_prescriptions_medical_history
		FOREIGN KEY (medical_history_id) 
		REFERENCES medical_history(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE prescription_details( -- DETALLE DE RECETA MEDICA
	prescriptions_id INT,
	medicine_id INT,

	CONSTRAINT pk_prescriptions_medicine -- PK compuesta
		PRIMARY KEY (prescriptions_id, medicine_id),

	CONSTRAINT fk_prescription_details_prescriptions
		FOREIGN KEY (prescriptions_id) 
		REFERENCES prescriptions(id)
		ON DELETE RESTRICT,

	CONSTRAINT fk_prescription_details_medicine
		FOREIGN KEY (medicine_id) 
		REFERENCES medicines (id)
		ON DELETE RESTRICT
);








