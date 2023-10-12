import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { PrivateRouter } from "../../src/router/PrivateRouter"
import { MemoryRouter } from "react-router-dom"

describe('Pruebas en <PrivateRoute />', () => {

    test('Debe de mostrar el children si esta autenticado', () => {

        Storage.prototype.setItem = jest.fn()

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Cristhian'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRouter>
                        <h1>Ruta Privada</h1>
                    </PrivateRouter>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta Privada')).toBeTruthy()
        expect( localStorage.setItem ).toHaveBeenCalledWith(
            'lastPath', '/search?q=batman'
        )
    })
})